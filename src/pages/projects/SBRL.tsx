import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export const SBRL: React.FC = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div className="back-button" style={{ padding: '2rem 2rem 0' }}>
                <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none' }}>
                    <ArrowLeft size={18} />
                    Back to Projects
                </Link>
            </div>
            <div className="project-header">
<div className="header-content">
<div className="project-icon">🛢️</div>
<h1>Petroleum Fraud Detection System</h1>
<div className="project-tags">
<span className="tag">Python</span>
<span className="tag">TensorFlow</span>
<span className="tag">Keras</span>
<span className="tag">Machine Learning</span>
</div>
<div className="project-meta">
<div className="meta-item">
<span>📅</span>
<span>Completed: August 2025</span>
</div>
<div className="meta-item">
<span>🏢</span>
<span>Tasguard Solutions</span>
</div>
<div className="meta-item">
<span>👤</span>
<span>Role: Lead Developer</span>
</div>
</div>
</div>
</div><div className="container">
<!-- Overview Section -->
<div className="content-section">
<h2>Project Overview</h2>
<p>The Petroleum Fraud Detection System is an advanced machine learning solution designed to identify and prevent fraudulent activities in petroleum plants. This project leverages state-of-the-art deep learning techniques to analyze operational data and detect anomalies that indicate potential fraud.</p>
<div className="stats-grid">
<div className="stat-card">
<h4>90%</h4>
<p>Detection Accuracy</p>
</div>
<div className="stat-card">
<h4>80%</h4>
<p>Processing Time Reduction</p>
</div>
<div className="stat-card">
<h4>100K+</h4>
<p>Data Points Analyzed</p>
</div>
</div>
<h3>Challenge</h3>
<p>Petroleum plants face significant financial losses due to fraudulent activities that are difficult to detect using traditional methods. The challenge was to develop an automated system capable of identifying complex fraud patterns in real-time operational data.</p>
<h3>Solution</h3>
<p>I developed a comprehensive machine learning model using Python, TensorFlow, and Keras. The solution involved:</p>
<ul>
<li>Extensive data collection and preprocessing from multiple petroleum plant sources</li>
<li>Advanced feature engineering to extract meaningful patterns from raw operational data</li>
<li>Implementation of deep neural networks optimized for anomaly detection</li>
<li>Real-time monitoring system integration for immediate fraud alerts</li>
<li>Comprehensive testing and validation using historical fraud cases</li>
</ul>
</div>
<!-- Technical Details Section -->
<div className="content-section">
<h2>Technical Implementation</h2>
<h3>Data Processing Pipeline</h3>
<p>The data processing pipeline handles multiple data streams from petroleum plant operations, including transaction logs, sensor data, and operational metrics. The system performs real-time cleaning, normalization, and feature extraction.</p>
<div className="image-placeholder">
                [Architecture Diagram - Add your image here]
            </div>
<h3>Model Architecture</h3>
<p>The model uses a combination of convolutional neural networks and recurrent layers to capture both spatial and temporal patterns in the data. Key components include:</p>
<ul>
<li>Multi-layer CNN for feature extraction from operational patterns</li>
<li>LSTM layers for temporal sequence analysis</li>
<li>Attention mechanisms to focus on critical fraud indicators</li>
<li>Custom loss functions optimized for imbalanced fraud detection</li>
</ul>
<h3>Technologies Used</h3>
<ul>
<li><strong>Python 3.9+</strong> - Core programming language</li>
<li><strong>TensorFlow 2.x</strong> - Deep learning framework</li>
<li><strong>Keras</strong> - High-level neural network API</li>
<li><strong>Pandas &amp; NumPy</strong> - Data manipulation and analysis</li>
<li><strong>Scikit-learn</strong> - Machine learning utilities</li>
<li><strong>Docker</strong> - Containerization for deployment</li>
</ul>
</div>
<!-- Results Section -->
<div className="content-section">
<h2>Results &amp; Impact</h2>
<h3>Performance Metrics</h3>
<p>The system achieved exceptional performance across all key metrics:</p>
<ul>
<li>Detection accuracy of 90% on validation dataset</li>
<li>False positive rate reduced to less than 5%</li>
<li>Processing time reduced by over 80% compared to manual review</li>
<li>Real-time alerts delivered within 2 seconds of fraud detection</li>
</ul>
<h3>Business Impact</h3>
<p>The implementation of this fraud detection system resulted in significant business benefits:</p>
<ul>
<li>Prevented estimated $2M+ in potential fraud losses annually</li>
<li>Reduced investigation time from days to minutes</li>
<li>Improved compliance with industry regulations</li>
<li>Enhanced trust and transparency in operational processes</li>
</ul>
<div className="image-placeholder">
                [Results Dashboard Screenshot - Add your image here]
            </div>
</div>
<!-- Lessons Learned Section -->
<div className="content-section">
<h2>Lessons Learned</h2>
<p>This project provided valuable insights into developing production-ready machine learning systems:</p>
<ul>
<li><strong>Data Quality</strong> - The importance of comprehensive data cleaning and validation cannot be overstated. Investing time in preprocessing significantly improved model performance.</li>
<li><strong>Feature Engineering</strong> - Domain expertise combined with automated feature selection led to better results than purely automated approaches.</li>
<li><strong>Model Interpretability</strong> - Providing explainable predictions was crucial for stakeholder buy-in and system trust.</li>
<li><strong>Continuous Monitoring</strong> - Implementing monitoring and retraining pipelines ensures the model adapts to evolving fraud patterns.</li>
</ul>
</div>
<!-- Call to Action -->
<div className="content-section">
<h2>Get Involved</h2>
<p>Interested in learning more about this project or discussing similar fraud detection challenges? Feel free to reach out or check out the code repository.</p>
<div className="btn-container">
<a className="btn btn-primary" download="" href="../pdf/petroleum-fraud.pdf">Download Project PDF</a>
<a className="btn btn-secondary" href="https://github.com/yourusername/petroleum-fraud" target="_blank">View on GitHub</a>
<a className="btn btn-secondary" href="mailto:anointingtasker2002@gmail.com">Contact Me</a>
</div>
</div>
</div>
        </div>
    );
};
