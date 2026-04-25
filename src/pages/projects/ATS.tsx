import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Bug, Package, Mail, Download, ShieldCheck } from 'lucide-react';


export const ATS: React.FC = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div className="back-button" style={{ padding: '2rem 2rem 0' }}>
                <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none' }}>
                    <ArrowLeft size={18} />
                    Back to Projects
                </Link>
            </div>
            <div className="project-header">
<div className="project-banner">
<!-- Add your banner image here -->
<img alt="Animator Trigger System" onError="this.style.display='none'" src="../assets/images/project_images/projects/ats_pic.png"/>
</div>
<h1>Animator Trigger System</h1>
<p style={{ 'color': 'var(--text-secondary)', 'fontSize': '1.1rem', 'marginBottom': '1.5rem' }}>
            A scriptless bridge between coding and visual scripting for Unity Animator parameters
        </p>
<div style={{ 'marginBottom': '1.5rem' }}>
<span className="badge">
<Package style={{ 'width': '16px', 'height': '16px' } />
                Unity 2020.3+
            </span>
<span className="badge">
<ShieldCheck style={{ 'width': '16px', 'height': '16px' } />
                MIT License
            </span>
</div>
<div className="project-tags">
<span className="tag">Unity</span>
<span className="tag">C#</span>
<span className="tag">Game Development</span>
<span className="tag">Animation</span>
<span className="tag">Visual Scripting</span>
<span className="tag">No-Code</span>
</div>
<div className="project-meta">
<div className="meta-item">
<span className="meta-label">Type</span>
<span className="meta-value">Unity Addon / Package</span>
</div>
<div className="meta-item">
<span className="meta-label">Status</span>
<span className="meta-value">Production Ready</span>
</div>
<div className="meta-item">
<span className="meta-label">License</span>
<span className="meta-value">MIT Open Source</span>
</div>
</div>
</div><div className="container">
<!-- Overview Section -->
<div className="content-section">
<h2>Project Overview</h2>
<p>Animator Trigger System is a powerful Unity addon that provides a <strong>no-code solution</strong> for
                controlling Animator parameters based on values from your scripts. It eliminates the need to write
                custom Animator controller code while maintaining full flexibility.</p>
<p>This tool bridges the gap between programming and visual animation control, allowing developers to create
                dynamic animation systems without writing repetitive controller code. Whether you're prototyping quickly
                or building production-ready features, this system streamlines your workflow.</p>
<h3>Key Features</h3>
<div className="feature-grid">
<div className="feature-card">
<h4>Direct Binding</h4>
<p>Map script values directly to animator properties without writing any additional code</p>
</div>
<div className="feature-card">
<h4>Conditional Logic</h4>
<p>Use if-else rules with comparison operators for complex animation behavior</p>
</div>
<div className="feature-card">
<h4>Nested Property Support</h4>
<p>Access complex properties like myList.Count, transform.position, and more</p>
</div>
<div className="feature-card">
<h4>Optimized Performance</h4>
<p>Cached reflection system with optional debug mode for production builds</p>
</div>
<div className="feature-card">
<h4>Visual Inspector</h4>
<p>Intuitive dropdown-based configuration directly in the Unity Inspector</p>
</div>
<div className="feature-card">
<h4>Flexible Update Modes</h4>
<p>Choose between Update, FixedUpdate, or LateUpdate based on your needs</p>
</div>
</div>
</div>
<!-- Getting Started Section -->
<div className="content-section">
<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
<li>Unity 2020.3 or later</li>
<li>Animator component on the GameObject</li>
</ul>
<h3>Installation Methods</h3>
<h4 style={{ 'color': 'var(--text-primary)', 'marginTop': '2rem' }}>Method 1: Unity Package Manager (Recommended)</h4>
<ol style={{ 'marginLeft': '2rem', 'color': 'var(--text-secondary)' }}>
<li style={{ 'marginBottom': '0.5rem' }}>Open Unity Package Manager</li>
<li style={{ 'marginBottom': '0.5rem' }}>Click the '+' button, select "Add package from git URL"</li>
<li style={{ 'marginBottom': '0.5rem' }}>Paste:
                    <code>https://github.com/cherryland120/animator-trigger-system.git</code></li>
</ol>
<h4 style={{ 'color': 'var(--text-primary)', 'marginTop': '2rem' }}>Method 2: Direct Download</h4>
<ol style={{ 'marginLeft': '2rem', 'color': 'var(--text-secondary)' }}>
<li style={{ 'marginBottom': '0.5rem' }}>Download the .unitypackage from <a href="https://tasguard.com/projects/downloadables/animator_trigger_system.unitypackage" style={{ 'color': 'var(--accent)' }}>tasguard.com</a></li>
<li style={{ 'marginBottom': '0.5rem' }}>In Unity: Assets → Import Package → Custom Package</li>
<li style={{ 'marginBottom': '0.5rem' }}>Select the downloaded file and click Import</li>
</ol>
<h4 style={{ 'color': 'var(--text-primary)', 'marginTop': '2rem' }}>Method 3: Manual Installation</h4>
<ol style={{ 'marginLeft': '2rem', 'color': 'var(--text-secondary)' }}>
<li style={{ 'marginBottom': '0.5rem' }}>Clone or download the repository</li>
<li style={{ 'marginBottom': '0.5rem' }}>Copy the AnimatorTriggerSystem folder into your Unity project's
                    Assets directory</li>
</ol>
</div>
<!-- Usage Section -->
<div className="content-section">
<h2>Usage Guide</h2>
<h3>Basic Setup</h3>
<p><strong>Step 1: Add the Component</strong></p>
<ul>
<li>Select your GameObject with an Animator</li>
<li>Add Component → Animator Trigger System → Animator Trigger</li>
</ul>
<p><strong>Step 2: Configure Update Mode</strong></p>
<div className="code-block">
<pre>Update        - Evaluates every frame (default)
FixedUpdate   - Evaluates at fixed intervals (physics)
LateUpdate    - Evaluates after all Update calls</pre>
</div>
<p><strong>Step 3: Create Rules</strong></p>
<ul>
<li>Click "Add New Rule"</li>
<li>Configure each rule as shown below</li>
</ul>
<h3>Rule Configuration Examples</h3>
<h4 style={{ 'color': 'var(--text-primary)', 'marginTop': '2rem' }}>Direct Binding Example</h4>
<p>Monitor a health value and update animator float:</p>
<div className="code-block">
<pre>Parameter Name: Health
Parameter Type: Float (auto-set)
Rule Type: Direct Binding
Source Object: [Your Player GameObject]
Source Component: PlayerScript
Source Field: currentHealth</pre>
</div>
<h4 style={{ 'color': 'var(--text-primary)', 'marginTop': '2rem' }}>Conditional Logic Example</h4>
<p>Set a bool based on list count:</p>
<div className="code-block">
<pre>Parameter Name: HasItems
Parameter Type: Bool (auto-set)
Rule Type: Conditional
Source Object: [Your Inventory GameObject]
Source Component: InventoryScript
Source Field: items.Count
If Source: Greater Than
Is (int): 0
Then Set To (bool): true
Else Set To (bool): false</pre>
</div>
</div>
<!-- Use Cases Section -->
<div className="content-section">
<h2>Use Cases</h2>
<div className="three-column-layout">
<div className="column">
<h4>Character Animation</h4>
<ul style={{ 'marginLeft': '1.5rem' }}>
<li>Update "Speed" float based on rigidbody.velocity.magnitude</li>
<li>Set "IsGrounded" bool based on GroundCheck script</li>
<li>Trigger "Attack" when attackCooldown ≤ 0</li>
</ul>
</div>
<div className="column">
<h4>UI Animation</h4>
<ul style={{ 'marginLeft': '1.5rem' }}>
<li>Show notification icon when messages.Count &gt; 0</li>
<li>Update progress bar based on questProgress value</li>
<li>Animate menu based on selectedIndex</li>
</ul>
</div>
<div className="column">
<h4>Game State</h4>
<ul style={{ 'marginLeft': '1.5rem' }}>
<li>Change environment animator based on timeOfDay</li>
<li>Update enemy behavior based on player distance</li>
<li>Sync audio visualizer with music intensity</li>
</ul>
</div>
</div>
</div>
<!-- Advanced Features Section -->
<div className="content-section">
<h2>Advanced Features</h2>
<h3>Supported Property Types</h3>
<ul>
<li><strong>Primitives:</strong> int, float, bool, string</li>
<li><strong>Unity Types:</strong> Vector2, Vector3, Vector4, Color, Quaternion</li>
<li><strong>Collections:</strong> .Count, .Length properties</li>
<li><strong>Nested:</strong> Access properties of properties (e.g., transform.position.x)</li>
</ul>
<h3>Comparison Operators</h3>
<ul>
<li>Equals (==)</li>
<li>Not Equals (!=)</li>
<li>Greater Than (&gt;)</li>
<li>Less Than (&lt;)&lt; /li&gt;
                <li>Greater or Equal (≥)</li>
<li>Less or Equal (≤)</li>
</li></ul>
<h3>Performance Tips</h3>
<ul>
<li>Use appropriate Update Mode (FixedUpdate for physics-based values)</li>
<li>Disable unused rules instead of deleting them</li>
<li>Keep Debug Mode off in production builds</li>
<li>Click "Clear All Reflection Caches" if you modify source scripts</li>
</ul>
</div>
<!-- Troubleshooting Section -->
<div className="content-section">
<h2>Troubleshooting</h2>
<h3>"Parameter name is empty"</h3>
<p><strong>Fix:</strong> Use the dropdown to select a parameter from your Animator Controller. Make sure
                your Animator has a Controller assigned.</p>
<h3>"No public fields/properties"</h3>
<p><strong>Fix:</strong> Make sure your field is public in your script</p>
<div className="code-block">
<pre>public List&lt;GameObject&gt; myList;  // Correct
private List&lt;GameObject&gt; myList; // Wrong</pre>
</div>
<h3>"Could not find field or property"</h3>
<p><strong>Fix:</strong></p>
<ul>
<li>Check spelling and case sensitivity</li>
<li>Use dropdowns instead of typing manually</li>
<li>Click "Clear All Reflection Caches" after script changes</li>
</ul>
<h3>Value doesn't update</h3>
<p><strong>Fix:</strong></p>
<ul>
<li>Enable Debug Mode to see evaluation logs</li>
<li>Check that the source GameObject is assigned correctly</li>
<li>Verify the rule is enabled (checkbox)</li>
</ul>
<h3>Debug Mode</h3>
<p>Enable debug logging to see detailed evaluation information:</p>
<div className="code-block">
<pre>Inspector → Debug → Check "Debug Mode"</pre>
</div>
<div className="alert">
<p><strong>💡 Tip:</strong> Keep Debug Mode off in production for better performance!</p>
</div>
</div>
<!-- Technical Details Section -->
<div className="content-section">
<h2>Project Structure</h2>
<div className="code-block">
<pre>AnimatorTriggerSystem/
├── Runtime/
│   ├── AnimatorTrigger.cs           # Main component
│   ├── AnimatorParameterRule.cs      # Rule logic
│   └── AnimatorTriggerSystem.asmdef
└── Editor/
    ├── AnimatorTriggerEditor.cs      # Custom inspector
    ├── AnimatorParameterRuleDrawer.cs # Property drawer
    └── AnimatorTriggerSystem.Editor.asmdef</pre>
</div>
</div>
<!-- Call to Action Section -->
<div className="content-section">
<h2>Get Involved</h2>
<p>Contributions are welcome! Whether you want to report bugs, suggest features, or contribute code, feel
                free to get involved with the project.</p>
<div className="btn-container">
<a className="btn btn-primary" href="https://github.com/cherryland120/animator-trigger-system" target="_blank">
<i className="devicon-github-original"  ></i>
                    View on GitHub
                </a>
<a className="btn btn-secondary" href="https://github.com/cherryland120/animator-trigger-system/issues" target="_blank">
<Bug  />
                    Report Issue
                </a>
<a className="btn btn-secondary" href="https://tasguard.com/projects/downloadables/animator_trigger_system.unitypackage" target="_blank">
<Download  />
                    Download Package
                </a>
<a className="btn btn-secondary" href="mailto:tasguardtech@gmail.com">
<Mail  />
                    Contact Support
                </a>
</div>
<div style={{ 'marginTop': '3rem', 'paddingTop': '2rem', 'borderTop': '1px solid var(--border)' }}>
<p style={{ 'textAlign': 'center', 'fontStyle': 'italic' }}>I really hope you enjoy it</p>
<p style={{ 'textAlign': 'right', 'color': 'var(--accent)', 'fontWeight': '500' }}>— Anointing Tamunowunari-Tasker
                </p>
</div>
</div>
</div>
        </div>
    );
};
