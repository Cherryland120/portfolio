import { Terminal } from 'xterm';

export class TerminalManager {
    private term: Terminal;
    private apps: any[] = [];
    private worker: Worker | null = null;
    private isRunningApp = false;

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
        this.term.onData(async (data) => {
            // Escape key (ASCII 27)
            if (data === '\x1b') {
                if (this.isRunningApp) {
                    this.killApp();
                } else {
                    window.location.href = '/'; // Exit CLIverse
                }
                return;
            }

            if (this.isRunningApp) {
                // If app is running, send input to the Web Worker via postMessage
                if (this.worker) {
                    this.worker.postMessage({ type: 'stdin', data });
                }
            } else {
                // Handle menu selection
                const choice = parseInt(data, 10);
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
        this.worker.postMessage({ type: 'start', url: wasmUrl });
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
