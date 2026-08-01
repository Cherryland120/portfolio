import { Terminal } from 'xterm';

export class TerminalManager {
    private term: Terminal;
    private apps: any[] = [];
    private worker: Worker | null = null;
    private isRunningApp = false;
    private sab: SharedArrayBuffer | null = null;
    private lineBuffer = '';

    constructor(term: Terminal) {
        this.term = term;
    }

    async boot() {
        this.term.writeln('Booting Tasker OS...');
        await this.delay(500);
        
        // Typing effect for the tagline
        const tagline = 'Explore the Tasker\'s CLIverse...';
        for (let i = 0; i < tagline.length; i++) {
            this.term.write(tagline[i]);
            await this.delay(50); // fast typing effect
        }
        this.term.writeln('\r\n');
        await this.delay(300);

        await this.fetchApps();
        this.showMenu();

        // Handle terminal input
        this.term.onData(async (inputStr) => {
            // Escape key (ASCII 27)
            if (inputStr === '\x1b') {
                if (this.isRunningApp) {
                    this.killApp();
                } else {
                    window.location.href = '/'; // Exit CLIverse
                }
                return;
            }

            if (this.isRunningApp) {
                // Buffer input line by line to handle backspaces correctly
                if (inputStr === '\r' || inputStr === '\n') {
                    this.term.write('\r\n');
                    this.lineBuffer += '\n';
                    
                    if (this.worker && this.sab) {
                        const int32 = new Int32Array(this.sab);
                        const data = new Uint8Array(this.sab, 8);
                        const bytes = new TextEncoder().encode(this.lineBuffer);
                        
                        let tail = Atomics.load(int32, 1);
                        for (let i = 0; i < bytes.length; i++) {
                            data[tail % data.length] = bytes[i];
                            tail++;
                        }
                        Atomics.store(int32, 1, tail);
                        Atomics.notify(int32, 1);
                    }
                    this.lineBuffer = '';
                } else if (inputStr === '\x7f' || inputStr === '\b') { // Backspace
                    if (this.lineBuffer.length > 0) {
                        this.lineBuffer = this.lineBuffer.slice(0, -1);
                        this.term.write('\b \b');
                    }
                } else {
                    this.lineBuffer += inputStr;
                    this.term.write(inputStr); // local echo
                }
            } else {
                // Handle menu selection
                const choice = parseInt(inputStr, 10);
                if (!isNaN(choice) && choice > 0 && choice <= this.apps.length) {
                    this.runApp(this.apps[choice - 1]);
                }
            }
        });
    }

    private async fetchApps() {
        this.term.writeln('\x1b[33mFetching available apps from Ascent repository...\x1b[0m');
        try {
            // In a real scenario, this would be the GitHub Pages URL
            // e.g., 'https://cherryland120.github.io/Ascent/apps.json'
            const res = await fetch('https://cherryland120.github.io/Ascent/apps.json');
            if (!res.ok) throw new Error('Failed to fetch apps');
            this.apps = await res.json();
            this.term.writeln('\x1b[32mSuccessfully loaded apps.\x1b[0m\r\n');
        } catch (e) {
            this.term.writeln('\x1b[31mFailed to load apps from GitHub. Are GitHub Pages enabled for Ascent?\x1b[0m\r\n');
            this.term.writeln(`Error: ${e}\r\n`);
        }
    }

    private showMenu() {
        this.term.writeln('====================================');
        this.term.writeln('           AVAILABLE APPS           ');
        this.term.writeln('====================================');
        
        if (this.apps.length === 0) {
            this.term.writeln('No apps found.');
        } else {
            this.apps.forEach((app, index) => {
                this.term.writeln(` [${index + 1}] ${app.name}`);
            });
        }
        
        this.term.writeln('\r\nType a number to launch an app, or press [ESC] to quit.');
    }

    private runApp(app: any) {
        this.isRunningApp = true;
        this.term.reset();
        this.term.writeln(`\x1b[32mLaunching ${app.name}...\x1b[0m\r\n`);

        // Initialize Web Worker
        this.worker = new Worker(new URL('./wasi-worker.ts', import.meta.url), { type: 'module' });
        
        // Listen for output from the Worker
        this.worker.onmessage = (e) => {
            if (e.data.type === 'stdout') {
                this.term.write(e.data.data);
            } else if (e.data.type === 'exit') {
                this.term.writeln(`\r\n\x1b[33m[Process exited with code ${e.data.code}]\x1b[0m`);
                this.killApp();
            } else if (e.data.type === 'error') {
                this.term.writeln(`\r\n\x1b[31m[Worker Error: ${e.data.message}]\x1b[0m`);
                this.killApp();
            }
        };

        const wasmUrl = `https://cherryland120.github.io/Ascent/${app.url}`;
        this.sab = new SharedArrayBuffer(4096);
        this.worker.postMessage({ type: 'start', url: wasmUrl, sab: this.sab });
    }

    private killApp() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
        this.isRunningApp = false;
        this.term.reset();
        this.showMenu();
    }

    public dispose() {
        if (this.worker) {
            this.worker.terminate();
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
