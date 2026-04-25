import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FileText, Mail } from 'lucide-react';


export const TDMPR: React.FC = () => {
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
<img alt="Thoracic Disease Classification System" src="../assets/images/project_images/projects/thoracic_grid.png"/>
</div>
<h1>Development of Classification Model for Thoracic Diseases with Chest X-ray Images Using Deep Convolutional
            Neural Network</h1>
<div className="project-tags">
<span className="tag">Python</span>
<span className="tag">TensorFlow</span>
<span className="tag">Keras</span>
<span className="tag">Deep Learning</span>
<span className="tag">Medical Imaging</span>
<span className="tag">CNNs</span>
</div>
<div className="project-meta">
<div className="meta-item">
<span className="meta-label">Published</span>
<span className="meta-value">August 2025 (BEEI Journal)</span>
</div>
<div className="meta-item">
<span className="meta-label">Organization</span>
<span className="meta-value">Tasguard Solutions</span>
</div>
<div className="meta-item">
<span className="meta-label">Role</span>
<span className="meta-value">Researcher Contributor</span>
</div>
</div>
</div><div className="container">
<!-- Overview Section -->
<div className="content-section">
<h2>Project Overview</h2>
<p>A <strong>thoracic disease</strong> is a medical condition in the chest wall region. Accurate thoracic
                disease diagnosis in patients is critical for effective treatment. Atelectasis, mass, pneumonia, and
                pneumothorax are thoracic diseases that can lead to life-threatening conditions if not detected and
                treated early enough. When diagnosing these diseases, human expertise can also be susceptible to errors
                due to fatigue or emotional factors. This research proposes developing a real-time deep learning-based
                classification model for thoracic diseases.</p>
<h3>What are Thoracic Diseases?</h3>
<p>Thoracic disorders encompass a wide range of potentially life-threatening conditions affecting the heart,
                lungs, esophagus, mediastinum, chest wall, and great vessels. According to the World Health Organization
                (WHO), pneumonia is particularly critical among these. Pneumonia, a viral or bacterial infection, is a
                leading cause of death in children globally, especially in low and middle-income countries. These
                statistics highlight the urgent need for accurate and accessible diagnostic tools.</p>
<p>CXRs are the preferred diagnostic tool for thoracic diseases such as pneumonia and tuberculosis and signs
                of heart failure like cardiomegaly (enlarged heart), pulmonary edema (fluid in the lungs) and lung
                cancer indications such as mass and nodules. This is because CXR's are readily accessible in most
                healthcare facilities, even in remote or resource-constrained settings. Compared to more advanced
                imaging techniques like CT scans or MRIs, CXRs offer a cost-effective and low-radiation alternative.</p>
<div className="content-image">
<img alt="Thoracic Disease Examples" src="../assets/images/project_images/projects/packed.png"/>
</div>
<h3>What We Did</h3>
<div className="classification-layout">
<div>
<p>We propose developing a real-time deep learning-based classification model for thoracic diseases.
                        Three deep convolutional neural network (CNN) models: <strong>MobileNetV3Large</strong>,
                        <strong>ResNet50</strong>, and <strong>EfficientNetB7</strong> were evaluated for classification
                        of these diseases by 5-way, 4-way, and 3-way approaches.
                    </p>
<div className="three-column-layout">
<div className="column">
<p>5 Classes</p>
<ul>
<li>No Finding</li>
<li>Atelectasis</li>
<li>Mass</li>
<li>Pneumonia</li>
<li>Pneumothorax</li>
</ul>
</div>
<div className="column">
<p>4 Classes</p>
<ul>
<li>No Finding</li>
<li>Atelectasis</li>
<li>Pneumothorax</li>
<li>Pneumonia</li>
</ul>
</div>
<div className="column">
<p>3 Classes</p>
<ul>
<li>No Finding</li>
<li>Atelectasis</li>
<li>Pneumonia</li>
</ul>
</div>
</div>
</div>
<div className="content-image" style={{ 'margin': '0' }}>
<img alt="Conceptual Framework" src="../assets/images/project_images/projects/concept.png"/>
</div>
</div>
<h3>Model Architectures</h3>
<p><strong>MobileNetV3Large</strong> - The design of MobileNetV3 incorporates advancements from both
                MobileNetV2 and a new architecture search technique called NetAdapt, ensuring an optimal balance between
                computational efficiency and accuracy. Its streamlined architecture is particularly beneficial when
                handling large medical image datasets, where computational resources and inference speeds are critical.
            </p>
<p><strong>ResNet50</strong> - ResNet50, short for residual network with 50 layers, is one of the most
                renowned deep learning models due to its exceptional performance in image classification tasks. In the
                network, each residual block typically consists of three layers: a 1×1 convolution, a 3×3 convolution,
                and another 1×1 convolution. The output of these layers is then added to the input of the block, forming
                a shortcut connection that allows gradients to flow directly through the network.</p>
<p><strong>EfficientNetB7</strong> - EfficientNet's compound scaling algorithm strikes a compromise between
                network depth, breadth, and resolution. This approach entails simultaneously growing its depth, breadth,
                and resolution to construct a sequence of models from EfficientNetB0 to EfficientNetB7, with B7 being
                the largest and most powerful.</p>
</div>
<!-- Technical Implementation -->
<div className="content-section">
<h2>Technical Implementation</h2>
<h3>Data Sources</h3>
<p>The selected images were mutually exclusive from recognized and benchmarked dataset. The <a href="https://www.kaggle.com/datasets/nih-chest-xrays/data" target="_blank">NIH Chest X-ray 14
                    dataset</a> contains over 100,000 frontal-view X-ray images of 32,717 unique patients. The images
                are labelled with 14 different thoracic disease conditions, making it a significant resource for
                training and evaluating machine learning models in medical imaging and disease detection.</p>
<div className="full-width-image">
<img alt="Data Processing Pipeline" src="../assets/images/project_images/projects/Data_Processing_Pipeline.jpg"/>
</div>
<h3>Dataset Distribution</h3>
<p>The table below shows the description of the dataset with atelectasis, mass, pneumonia, pneumothorax and
                normal with equal total number of classes, training, validation, and testing data of 1500, 1050, and 300
                respectively.</p>
<div className="table-wrapper">
<table>
<thead>
<tr>
<th>Classes</th>
<th>Total number of CXIs/class</th>
<th>Training set</th>
<th>Validation set</th>
<th>Testing set</th>
</tr>
</thead>
<tbody>
<tr>
<td className="subclass-cell">Atelectasis</td>
<td className="metrics-cell">1500</td>
<td>1050</td>
<td>150</td>
<td>300</td>
</tr>
<tr>
<td className="subclass-cell">Mass</td>
<td className="metrics-cell">1500</td>
<td>1050</td>
<td>150</td>
<td>300</td>
</tr>
<tr>
<td className="subclass-cell">Pneumonia</td>
<td className="metrics-cell">1500</td>
<td>1050</td>
<td>150</td>
<td>300</td>
</tr>
<tr>
<td className="subclass-cell">Pneumothorax</td>
<td className="metrics-cell">1500</td>
<td>1050</td>
<td>150</td>
<td>300</td>
</tr>
<tr>
<td className="subclass-cell">Normal</td>
<td className="metrics-cell">1500</td>
<td>1050</td>
<td>150</td>
<td>300</td>
</tr>
</tbody>
</table>
</div>
<h3>Model Architecture Customization</h3>
<p>The layers introduced to the three models architecture were chosen to customize the model for the
                specific objective of thoracic illness categorization:</p>
<ul>
<li><strong>The Flatten() layer</strong> converts the multi-dimensional output from the base model into
                    a one-dimensional vector. This transition from convolutional layers to fully connected layers is
                    crucial for preparing the data for classification by the dense layers that follow.</li>
<li><strong>First Dense(256, activation=swish)</strong> layer introduces 256 fully connected neurons
                    with the Swish activation function which is known for its smooth and non-monotonic nature, allowing
                    the model to learn complex, non-linear data representations.</li>
<li><strong>Dropout(0.5)</strong> is a regularization approach for avoiding overfitting. Dropout
                    improves model generalizability to new data by randomly setting 50% of neurons to zero during each
                    training cycle.</li>
<li><strong>Dense Layer (128 units, Swish activation)</strong>: The second Dense(128, activation=swish)
                    layer adds another set of fully connected neurons, further increasing the model's capacity to learn
                    complex features from the data.</li>
<li><strong>Output layer</strong>: The final Dense(K, activation="softmax",
                    kernel_regularizer=l2(0.001)) layer produces probability distributions over the dataset's K classes
                    of thoracic diseases.</li>
</ul>
<h3>Technologies Used</h3>
<ul>
<li><strong>Python 3.9+</strong> - Core programming language</li>
<li><strong>TensorFlow 2.x</strong> - Deep learning framework</li>
<li><strong>Keras</strong> - High-level neural network API</li>
<li><strong>Pandas &amp; NumPy</strong> - Data manipulation and analysis</li>
<li><strong>Scikit-learn</strong> - Machine learning utilities</li>
</ul>
<h3>Training Environment</h3>
<ul>
<li>HP Pavilion Laptop 15-cc0xx</li>
<li>Microsoft Windows 11 Pro 64-bit</li>
<li>Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz with a max clock speed of 2712</li>
<li>4-partitioned SSD of 256052966400 bytes Storage</li>
</ul>
</div>
<!-- Results Section -->
<div className="content-section">
<h2>Results &amp; Impact</h2>
<h3>Performance Metrics</h3>
<p>The table below summarizes the performance across all key metrics, classes and models:</p>
<div className="table-wrapper">
<table>
<thead>
<tr>
<th>Subclass</th>
<th>Metrics</th>
<th>Disease</th>
<th>MobileNetV3Large (%)</th>
<th>ResNet50 (%)</th>
<th>EfficientNetB7 (%)</th>
</tr>
</thead>
<tbody>
<!-- 5-way classification -->
<tr>
<td className="subclass-cell" rowspan="16">5-way classification</td>
<td className="metrics-cell" rowspan="1">Accuracy</td>
<td>-</td>
<td>75.72</td>
<td>75.2</td>
<td>73.03</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="5">Precision</td>
<td>Atelectasis</td>
<td>55.71</td>
<td>57.91</td>
<td>61.39</td>
</tr>
<tr>
<td>Mass</td>
<td>59.46</td>
<td>60.64</td>
<td>50.29</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>97.01</td>
<td>92.49</td>
<td>93.04</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>80.32</td>
<td>75.97</td>
<td>69.11</td>
</tr>
<tr>
<td>Normal</td>
<td>94.5</td>
<td>94.40</td>
<td>96.02</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="5">Recall</td>
<td>Atelectasis</td>
<td>80.74</td>
<td>67.83</td>
<td>63.39</td>
</tr>
<tr>
<td>Mass</td>
<td>59.66</td>
<td>72.15</td>
<td>57.81</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>94.49</td>
<td>94.02</td>
<td>96.56</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>46.51</td>
<td>47.22</td>
<td>56.29</td>
</tr>
<tr>
<td>Normal</td>
<td>96.83</td>
<td>92.88</td>
<td>93.66</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="5">F1-score</td>
<td>Atelectasis</td>
<td>65.93</td>
<td>62.47</td>
<td>62.37</td>
</tr>
<tr>
<td>Mass</td>
<td>59.56</td>
<td>65.89</td>
<td>53.79</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>95.73</td>
<td>93.24</td>
<td>94.77</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>58.91</td>
<td>58.24</td>
<td>62.04</td>
</tr>
<tr>
<td>Normal</td>
<td>95.65</td>
<td>93.64</td>
<td>94.82</td>
</tr>
<!-- 4-way classification -->
<tr>
<td className="subclass-cell" rowspan="13">4-way classification</td>
<td className="metrics-cell" rowspan="1">Accuracy</td>
<td>-</td>
<td>87.25</td>
<td>87.08</td>
<td>88.08</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="4">Precision</td>
<td>Atelectasis</td>
<td>76.76</td>
<td>78.95</td>
<td>76.53</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>97.32</td>
<td>92.15</td>
<td>96.79</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>79.25</td>
<td>81.17</td>
<td>83.98</td>
</tr>
<tr>
<td>Normal</td>
<td>95.93</td>
<td>97.74</td>
<td>97.05</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="4">Recall</td>
<td>Atelectasis</td>
<td>76.48</td>
<td>80.00</td>
<td>87.26</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>96.67</td>
<td>97.9</td>
<td>96.45</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>79.01</td>
<td>80.43</td>
<td>71.9</td>
</tr>
<tr>
<td>Normal</td>
<td>97.25</td>
<td>91.23</td>
<td>97.05</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="4">F1-score</td>
<td>Atelectasis</td>
<td>76.62</td>
<td>79.47</td>
<td>81.54</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>96.99</td>
<td>94.93</td>
<td>96.61</td>
</tr>
<tr>
<td>Pneumothorax</td>
<td>79.13</td>
<td>80.79</td>
<td>77.47</td>
</tr>
<tr>
<td>Normal</td>
<td>96.58</td>
<td>94.38</td>
<td>97.05</td>
</tr>
<!-- 3-way classification -->
<tr>
<td className="subclass-cell" rowspan="10">3-way classification</td>
<td className="metrics-cell" rowspan="1">Accuracy</td>
<td>-</td>
<td>97.44</td>
<td>97.88</td>
<td>96.55</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="3">Precision</td>
<td>Atelectasis</td>
<td>100</td>
<td>99.66</td>
<td>99.3</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>96.56</td>
<td>97.46</td>
<td>95.03</td>
</tr>
<tr>
<td>Normal</td>
<td>95.69</td>
<td>96.57</td>
<td>95.49</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="3">Recall</td>
<td>Atelectasis</td>
<td>100</td>
<td>99.65</td>
<td>99.3</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>95.58</td>
<td>96.84</td>
<td>95.67</td>
</tr>
<tr>
<td>Normal</td>
<td>96.65</td>
<td>97.24</td>
<td>94.89</td>
</tr>
<tr>
<td className="metrics-cell" rowspan="3">F1-score</td>
<td>Atelectasis</td>
<td>100</td>
<td>99.65</td>
<td>99.3</td>
</tr>
<tr>
<td>Pneumonia</td>
<td>96.07</td>
<td>97.15</td>
<td>95.35</td>
</tr>
<tr>
<td>Normal</td>
<td>96.17</td>
<td>96.9</td>
<td>95.19</td>
</tr>
</tbody>
</table>
</div>
<h3>Discussion</h3>
<p>Several key insights emerge from the comparison in evaluating the three deep learning models across the
                5-way, 4-way, and 3-way classifications. MobileNetV3Large, ResNet50, and EfficientNetB7 demonstrate
                varying performance levels across different metrics and diseases, providing a comprehensive view of
                their strengths and weaknesses.</p>
<p>For the 5-way classification, which includes diseases such as atelectasis, mass, pneumonia, and
                pneumothorax, MobileNetV3Large achieves an overall accuracy of 75.72%, slightly outperforming ResNet50's
                75.20% but trailing behind EfficientNetB7's 73.03%. Regarding precision, MobileNetV3Large and ResNet50
                display close performance in Atelectasis with values of 55.71% and 57.91%, respectively, while
                EfficientNetB7 excels at 61.39%.</p>
<p>The models show improved overall accuracy in the 4-way classification, which omits one disease from the
                previous set. MobileNetV3Large achieves an accuracy of 87.25%, closely matched by ResNet50 at 87.08%,
                but both are surpassed by EfficientNetB7 at 88.08%. The precision metric for pneumonia is particularly
                noteworthy, where MobileNetV3Large scores 97.32%, closely followed by EfficientNetB7 at 96.79% and
                ResNet50 at 92.15%.</p>
<p>In the 3-way classification, which further simplifies the categorisation, all models show significantly
                higher accuracy and precision. MobileNetV3Large achieves an accuracy of 97.44%, ResNet50 slightly higher
                at 97.88%, and EfficientNetB7 at 96.55%. Precision for Atelectasis is perfect for MobileNetV3Large and
                ResNet50, achieving 100%, while EfficientNetB7 is close at 99.30%.</p>
</div>
<!-- Conclusion Section -->
<div className="content-section">
<h2>Conclusion</h2>
<p>Key findings highlighted the superior performance of MobileNetV3Large in terms of computational
                efficiency and accuracy, particularly when enhanced with transfer learning and attention mechanisms.
                ResNet50 showed robust performance across different disease classifications, often surpassing the other
                models in precision for complex classifications. EfficientNetB7 demonstrated competitive accuracy,
                highlighting its robustness in various classification scenarios.</p>
<p>The integration of attention mechanisms within these architectures significantly improved diagnostic
                precision by focusing on critical regions of the chest X-ray images. This approach reduced the
                dependency on radiologists and democratized access to high-quality diagnostic tools, especially in
                resource-constrained settings. The study underscores the transformative potential of AI in medical
                imaging, paving the way for future advancements in AI-powered healthcare.</p>
<h3>Research Team</h3>
<div className="three-column-layout">
<div className="column">
<ul>
<li>Kennedy Okokpujie</li>
<li>Tamunowunari-Tasker Anointing</li>
<li>Adaora Princess Ijeh</li>
</ul>
</div>
<div className="column">
<ul>
<li>Imhade Princess Okokpujie</li>
<li>Mary Oluwafeyisayo</li>
<li>Ogundele Oluwadamilola</li>
</ul>
</div>
<div className="column"></div>
</div>
</div>
<!-- Call to Action -->
<div className="content-section">
<h2>Get Involved</h2>
<p>Interested in learning more about this project or discussing similar medical AI challenges? Feel free to
                reach out or check out the publication.</p>
<div className="btn-container">
<a className="btn btn-primary" href="https://www.researchgate.net/publication/394334054" target="_blank">
<FileText  />
                    Read Publication
                </a>
<a className="btn btn-secondary" href="mailto:anointingtasker2002@gmail.com">
<Mail  />
                    Contact Me
                </a>
</div>
</div>
</div>
        </div>
    );
};
