# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please follow these steps:
1. Do not disclose the vulnerability publicly.
2. Email the maintainer directly (update with your preferred contact method).
3. Provide a detailed description of the issue, including steps to reproduce.

We take security seriously and will work to address any issues promptly.

## Security Architecture

This project utilizes advanced browser security features to safely execute third-party `.wasm` modules:
* **Cross-Origin Isolation (COI)**: Enforced via `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers to unlock `SharedArrayBuffer` and `Atomics` APIs.
* **Sandboxed WebAssembly**: CLI applications are executed within a sandboxed Web Worker using WASI (WebAssembly System Interface) via `@bjorn3/browser_wasi_shim`. This physically isolates execution from the main thread and prevents native access to the browser's DOM, window objects, or cookies.
