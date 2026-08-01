import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { ArrowLeft } from 'lucide-react';
import '../styles/cliverse.css';

export const Cliverse: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const [term, setTerm] = useState<Terminal | null>(null);
    
    useEffect(() => {
        if (!terminalRef.current) return;
        
        const terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#0a0a0a',
                foreground: '#00ff00',
                cursor: '#00ff00',
            },
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
        });
        
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalRef.current);
        fitAddon.fit();
        
        setTerm(terminal);
        
        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            terminal.dispose();
        };
    }, []);

    useEffect(() => {
        if (!term) return;
        
        import('../components/cliverse/TerminalManager').then(({ TerminalManager }) => {
            const manager = new TerminalManager(term);
            manager.boot();
            
            // Clean up when unmounting
            return () => {
                manager.dispose();
            };
        });
        
    }, [term]);

    return (
        <div className="cliverse-container">
            <div className="cliverse-header">
                <a href="/" className="back-link">
                    <ArrowLeft size={18} />
                    Exit CLIverse
                </a>
                <span className="cliverse-title">Tasker's CLIverse</span>
            </div>
            <div className="terminal-wrapper" ref={terminalRef}></div>
        </div>
    );
};
