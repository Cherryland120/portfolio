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
                renowned deep learning models due to exceptional performance in image classification tasks. In the
                network, each residual block typically consists of three layers: a 1×1 convolution, a 3×3 convolution,
                and another 1×1 convolution.</p>
<p><strong>EfficientNetB7</strong> - EfficientNet's compound scaling algorithm strikes a compromise between
                network depth, breadth, and resolution.</p>
</div>
