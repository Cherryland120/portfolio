import { WASI, Fd, ConsoleStdout } from '@bjorn3/browser_wasi_shim';

class WebWorkerStdin extends Fd {
    buffer: Uint8Array = new Uint8Array(0);
    
    constructor() {
        super();
    }
    
    // In a real robust implementation, this would use SharedArrayBuffer and Atomics.wait
    // to block execution until input is available. Since setting up SharedArrayBuffer 
    // requires strict CORS headers that might break other parts of the site, we'll
    // attempt a non-blocking or simplified approach here.
    
    // For standard Rust stdin blocking, true SharedArrayBuffer is required.
    // If not available, it throws.
    fd_read(view8: Uint8Array, iovs: any[]): { ret: number, nread: number } {
        // Simplified buffer reader - a robust one requires SharedArrayBuffer + Atomics.wait
        return { ret: 0, nread: 0 }; 
    }
}

class WebWorkerStdout extends ConsoleStdout {
    write(buffer: Uint8Array) {
        const text = new TextDecoder().decode(buffer);
        postMessage({ type: 'stdout', data: text.replace(/\n/g, '\r\n') });
    }
}

self.onmessage = async (e) => {
    if (e.data.type === 'start') {
        const { url } = e.data;
        
        try {
            const args = [url];
            const env: string[] = [];
            const fds = [
                new WebWorkerStdin(), // stdin
                new WebWorkerStdout(1), // stdout
                new WebWorkerStdout(2), // stderr
            ];
            
            const wasi = new WASI(args, env, fds);
            
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            
            const { instance } = await WebAssembly.instantiate(buffer, {
                wasi_snapshot_preview1: wasi.wasiImport
            });
            
            const exitCode = wasi.start(instance);
            postMessage({ type: 'exit', code: exitCode });
            
        } catch (err: any) {
            postMessage({ type: 'error', message: err.toString() });
        }
    }
};
