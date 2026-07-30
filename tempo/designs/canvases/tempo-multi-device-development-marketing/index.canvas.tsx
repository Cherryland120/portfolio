import { Canvas, Storyboard } from "tempo-sdk/canvas";

export default function TempoMultiDeviceDevelopmentMarketingCanvas() {
  return (
    <Canvas name={"Tempo Multi-Device — Development & Marketing"}>
      <Storyboard
        id="DesktopWorkspace"
        name="Desktop Workspace View"
        layout={{ x: 0, y: 0, width: 1200, height: 800 }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0b',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #5e6ad2 0%, #4a5bc7 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>T</div>
              <span style={{ fontWeight: '600', fontSize: '16px' }}>Tempo</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#888' }}>
              <span>Issues</span>
              <span>Docs</span>
              <span>Design</span>
              <span>Agents</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                padding: '6px 12px',
                background: '#222',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></div>
                Synced
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#333',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>JD</div>
            </div>
          </div>
          
          {/* Main Content */}
          <div style={{ flex: 1, display: 'flex' }}>
            {/* Sidebar */}
            <div style={{
              width: '240px',
              borderRight: '1px solid #222',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>WORKSPACE</div>
              <div style={{ padding: '8px 12px', background: '#1a1a1a', borderRadius: '6px', fontSize: '14px' }}>My Work</div>
              <div style={{ padding: '8px 12px', fontSize: '14px', color: '#888' }}>Board</div>
              <div style={{ padding: '8px 12px', fontSize: '14px', color: '#888' }}>Roadmap</div>
              <div style={{ padding: '8px 12px', fontSize: '14px', color: '#888' }}>Documents</div>
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#666', marginBottom: '8px' }}>AGENTS</div>
              <div style={{ padding: '8px 12px', fontSize: '14px', color: '#888' }}>PRD Writer</div>
              <div style={{ padding: '8px 12px', fontSize: '14px', color: '#888' }}>Code Reviewer</div>
            </div>
            
            {/* Content Area */}
            <div style={{ flex: 1, padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>My Work</h2>
              
              {/* Issue Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'TEM-17982', title: 'Multi-Device & Offline Mode', status: 'In Progress', priority: 'High', assignees: ['JD', 'AK'] },
                  { id: 'TEM-17983', title: 'Real-time Sync Engine', status: 'Todo', priority: 'Medium', assignees: ['JD'] },
                  { id: 'TEM-17984', title: 'Conflict Resolution UI', status: 'Todo', priority: 'High', assignees: ['MK'] },
                ].map((issue, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    background: '#111',
                    borderRadius: '8px',
                    border: '1px solid #222'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#5e6ad2', marginBottom: '4px' }}>{issue.id}</div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{issue.title}</div>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        background: issue.status === 'In Progress' ? '#1a2e1a' : '#1a1a2e',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: issue.status === 'In Progress' ? '#4ade80' : '#60a5fa'
                      }}>{issue.status}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '-8px' }}>
                        {issue.assignees.map((a, j) => (
                          <div key={j} style={{
                            width: '24px',
                            height: '24px',
                            background: '#333',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            marginLeft: j > 0 ? '-8px' : '0',
                            border: '2px solid #111'
                          }}>{a}</div>
                        ))}
                      </div>
                      <div style={{
                        padding: '2px 6px',
                        background: issue.priority === 'High' ? '#2e1a1a' : '#1a1a1a',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: issue.priority === 'High' ? '#f87171' : '#888'
                      }}>{issue.priority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Storyboard>

      <Storyboard
        id="MobileView"
        name="Mobile App View"
        layout={{ x: 1250, y: 0, width: 390, height: 844 }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0b',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Mobile Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'linear-gradient(135deg, #5e6ad2 0%, #4a5bc7 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>T</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Tempo</span>
            </div>
            <div style={{
              padding: '4px 8px',
              background: '#1a2e1a',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{ width: '4px', height: '4px', background: '#4ade80', borderRadius: '50%' }}></div>
              Online
            </div>
          </div>
          
          {/* Mobile Content */}
          <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>My Work</h2>
            
            {/* Mobile Issue Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'TEM-17982', title: 'Multi-Device & Offline Mode', status: 'In Progress', priority: 'High' },
                { id: 'TEM-17983', title: 'Real-time Sync Engine', status: 'Todo', priority: 'Medium' },
                { id: 'TEM-17984', title: 'Conflict Resolution UI', status: 'Todo', priority: 'High' },
              ].map((issue, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: '#111',
                  borderRadius: '8px',
                  border: '1px solid #222'
                }}>
                  <div style={{ fontSize: '11px', color: '#5e6ad2', marginBottom: '4px' }}>{issue.id}</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>{issue.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{
                      padding: '3px 6px',
                      background: issue.status === 'In Progress' ? '#1a2e1a' : '#1a1a2e',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: issue.status === 'In Progress' ? '#4ade80' : '#60a5fa'
                    }}>{issue.status}</div>
                    <div style={{
                      padding: '3px 6px',
                      background: issue.priority === 'High' ? '#2e1a1a' : '#1a1a1a',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: issue.priority === 'High' ? '#f87171' : '#888'
                    }}>{issue.priority}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Bottom Nav */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid #222',
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: '10px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff' }}>
              <div style={{ width: '20px', height: '20px', background: '#333', borderRadius: '4px' }}></div>
              Work
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '20px', background: '#222', borderRadius: '4px' }}></div>
              Board
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '20px', background: '#222', borderRadius: '4px' }}></div>
              Agents
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '20px', height: '20px', background: '#222', borderRadius: '4px' }}></div>
              Settings
            </div>
          </div>
        </div>
      </Storyboard>

      <Storyboard
        id="LandingHero"
        name="Marketing Landing Hero"
        layout={{ x: 0, y: 850, width: 1400, height: 700 }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #0a0a0b 0%, #111 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px'
        }}>
          <div style={{
            padding: '8px 16px',
            background: 'rgba(94, 106, 210, 0.1)',
            border: '1px solid rgba(94, 106, 210, 0.3)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#5e6ad2',
            marginBottom: '24px'
          }}>New: Multi-Device & Offline Mode</div>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: '1.1',
            marginBottom: '20px',
            maxWidth: '800px'
          }}>
            Ship products with AI agents that work for you
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#888',
            textAlign: 'center',
            maxWidth: '600px',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Your AI software team. Agents that think, plan, and build with you.
            Now available on any device, even offline.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
            <div style={{
              padding: '12px 24px',
              background: '#5e6ad2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>Get Started Free</div>
            <div style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#888'
            }}>View Demo</div>
          </div>
          
          {/* Device Mockups */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
            {/* Desktop */}
            <div style={{
              width: '400px',
              height: '250px',
              background: '#111',
              borderRadius: '8px 8px 0 0',
              border: '1px solid #333',
              borderBottom: 'none',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                <div style={{ width: '8px', height: '8px', background: '#ff5f57', borderRadius: '50%' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#ffbd2e', borderRadius: '50%' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#28ca42', borderRadius: '50%' }}></div>
              </div>
              <div style={{ flex: 1, background: '#0a0a0b', borderRadius: '4px', display: 'flex' }}>
                <div style={{ width: '80px', background: '#111', borderRadius: '4px 0 0 4px' }}></div>
                <div style={{ flex: 1, padding: '8px' }}>
                  <div style={{ height: '8px', background: '#222', borderRadius: '2px', width: '60%', marginBottom: '6px' }}></div>
                  <div style={{ height: '8px', background: '#222', borderRadius: '2px', width: '40%', marginBottom: '6px' }}></div>
                  <div style={{ height: '8px', background: '#222', borderRadius: '2px', width: '80%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Tablet */}
            <div style={{
              width: '200px',
              height: '280px',
              background: '#111',
              borderRadius: '12px',
              border: '1px solid #333',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: 1, background: '#0a0a0b', borderRadius: '4px', display: 'flex' }}>
                <div style={{ width: '60px', background: '#111', borderRadius: '4px 0 0 4px' }}></div>
                <div style={{ flex: 1, padding: '6px' }}>
                  <div style={{ height: '6px', background: '#222', borderRadius: '2px', width: '70%', marginBottom: '4px' }}></div>
                  <div style={{ height: '6px', background: '#222', borderRadius: '2px', width: '50%', marginBottom: '4px' }}></div>
                  <div style={{ height: '6px', background: '#222', borderRadius: '2px', width: '90%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Mobile */}
            <div style={{
              width: '120px',
              height: '240px',
              background: '#111',
              borderRadius: '16px',
              border: '1px solid #333',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: 1, background: '#0a0a0b', borderRadius: '4px', padding: '6px' }}>
                <div style={{ height: '4px', background: '#222', borderRadius: '2px', width: '60%', marginBottom: '4px' }}></div>
                <div style={{ height: '4px', background: '#222', borderRadius: '2px', width: '80%', marginBottom: '4px' }}></div>
                <div style={{ height: '4px', background: '#222', borderRadius: '2px', width: '40%' }}></div>
              </div>
              <div style={{ 
                height: '20px', 
                background: '#0a0a0b', 
                borderRadius: '0 0 4px 4px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0 8px'
              }}>
                <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '2px' }}></div>
                <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '2px' }}></div>
                <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '2px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </Storyboard>
    </Canvas>
  );
}