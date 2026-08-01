const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    const sab = new SharedArrayBuffer(4096);
    const int32 = new Int32Array(sab);
    const data = new Uint8Array(sab, 8);
    
    const worker = new Worker(__filename, { workerData: sab });
    
    setTimeout(() => {
        const str = "test input\n";
        const bytes = Buffer.from(str);
        let tail = Atomics.load(int32, 1);
        for (let i = 0; i < bytes.length; i++) {
            data[tail % data.length] = bytes[i];
            tail++;
        }
        Atomics.store(int32, 1, tail);
        Atomics.notify(int32, 1);
    }, 100);

    worker.on('message', msg => console.log('Worker says:', msg));
} else {
    const sab = workerData;
    const int32 = new Int32Array(sab);
    const data = new Uint8Array(sab, 8);
    
    let head = Atomics.load(int32, 0);
    let tail = Atomics.load(int32, 1);
    
    if (head === tail) {
        Atomics.wait(int32, 1, tail);
    }
    
    tail = Atomics.load(int32, 1);
    let readStr = "";
    while(head < tail) {
        readStr += String.fromCharCode(data[head % data.length]);
        head++;
    }
    parentPort.postMessage('Read: ' + readStr);
}
