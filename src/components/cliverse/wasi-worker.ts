import { WASI, Fd, ConsoleStdout } from '@bjorn3/browser_wasi_shim';

class WebWorkerStdin extends Fd {
    int32: Int32Array;
    data: Uint8Array;
    
    constructor(sab: SharedArrayBuffer) {
        super();
        this.int32 = new Int32Array(sab);
        this.data = new Uint8Array(sab, 8);
    }
    
    // @ts-expect-error: Base class Fd signature may differ
    fd_read(size: number): { ret: number, data: Uint8Array } {
        let result = new Uint8Array(size);
        let nread = 0;
        
        while (size > 0) {
            let head = Atomics.load(this.int32, 0);
            let tail = Atomics.load(this.int32, 1);
            
            if (head === tail) {
                if (nread > 0) {
                    break;
                }
                Atomics.wait(this.int32, 1, tail);
                continue;
            }
            
            result[nread] = this.data[head % this.data.length];
            size--;
            nread++;
            Atomics.store(this.int32, 0, head + 1);
        }
        
        return { ret: 0, data: result.slice(0, nread) }; 
    }
}

const writeToWorker = (buffer: Uint8Array) => {
    const text = new TextDecoder().decode(buffer);
    postMessage({ type: 'stdout', data: text.replace(/\n/g, '\r\n') });
};

self.onmessage = async (e) => {
    if (e.data.type === 'start') {
        const { url, sab } = e.data;
        
        try {
            const args = [url];
            const env: string[] = [];
            const fds = [
                new WebWorkerStdin(sab), // stdin
                new ConsoleStdout(writeToWorker), // stdout
                new ConsoleStdout(writeToWorker), // stderr
            ];
            
            // @ts-expect-error: Fd array type mismatch
            const wasi = new WASI(args, env, fds);
            
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            
            const { instance } = await WebAssembly.instantiate(buffer, {
                wasi_snapshot_preview1: wasi.wasiImport
            });
            
            // @ts-expect-error: WebAssembly.Instance types don't perfectly match WASI expectations
            const exitCode = wasi.start(instance);
            postMessage({ type: 'exit', code: exitCode });
            
        } catch (err: any) {
            const msg = err.stack ? err.stack.toString() : err.toString();
            postMessage({ type: 'error', message: msg });
        }
    }
};
