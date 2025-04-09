
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VideoCarousel from '@/components/videos/VideoCarousel';

const About = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">About Dr. Victoria Neiman</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading oncologist dedicated to providing personalized cancer treatment through cutting-edge medical expertise and compassionate care.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Dr. Victoria Neiman" 
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 font-serif">Professional Biography</h2>
              <div className="w-20 h-1 bg-secondary"></div>
              
              <div className="text-gray-600 space-y-4">
                <p>
                  Dr. Victoria Neiman is a distinguished oncologist with over 15 years of experience in diagnosing and treating various types of cancer. Her expertise spans medical oncology with a special focus on breast cancer, lung cancer, and gastrointestinal tumors.
                </p>
                <p>
                  After completing her medical training at the Hadassah Medical Center in Jerusalem, Dr. Neiman pursued specialized oncology training in leading institutions across Europe and the United States. She holds multiple board certifications and is actively involved in clinical research to advance cancer treatment protocols.
                </p>
                <p>
                  Throughout her career, Dr. Neiman has been committed to a patient-centered approach to cancer care, ensuring that each treatment plan is tailored to the individual's specific condition, needs, and circumstances. Her philosophy integrates cutting-edge medical treatments with supportive care that addresses the physical, emotional, and psychological aspects of living with cancer.
                </p>
                <p>
                  Dr. Neiman is known for her compassionate bedside manner and her ability to explain complex medical concepts in a way that patients and their families can understand. She believes strongly in patient education and empowerment, ensuring that her patients are fully informed about their conditions and treatment options.
                </p>
              </div>
              
              <div className="pt-4">
                <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                  <Link to="/appointment">Schedule an Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
              Education & Credentials
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif">Education</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Medical Degree</h4>
                  <p className="text-gray-600">Hadassah Medical School, Hebrew University</p>
                  <p className="text-gray-500">Jerusalem, Israel • 2001-2007</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Oncology Fellowship</h4>
                  <p className="text-gray-600">Memorial Sloan Kettering Cancer Center</p>
                  <p className="text-gray-500">New York, USA • 2010-2013</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Internal Medicine Residency</h4>
                  <p className="text-gray-600">Tel Aviv Sourasky Medical Center</p>
                  <p className="text-gray-500">Tel Aviv, Israel • 2007-2010</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif">Certifications & Memberships</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Board Certifications</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                    <li>Israeli Board of Internal Medicine</li>
                    <li>Israeli Board of Medical Oncology</li>
                    <li>European Society for Medical Oncology (ESMO) Certification</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Professional Memberships</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                    <li>Israeli Society of Clinical Oncology and Radiation Therapy (ISCORT)</li>
                    <li>European Society for Medical Oncology (ESMO)</li>
                    <li>American Society of Clinical Oncology (ASCO)</li>
                    <li>International Association for the Study of Lung Cancer (IASLC)</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-lg">Languages</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                    <li>Hebrew (Native)</li>
                    <li>English (Fluent)</li>
                    <li>Russian (Proficient)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
              Media Appearances
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Watch Dr. Victoria Neiman's interviews and educational videos on various oncology topics.
            </p>
          </div>
          <VideoCarousel />
        </div>
      </section>

      {/* Research & Publications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
              Research & Publications
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Dr. Neiman has published numerous research papers and contributed to important advances in cancer treatment protocols.
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Selected Publications</h3>
                <ul className="space-y-4 mt-4">
                  {[
                    "Neiman V, et al. (2022) \"Efficacy and toxicity of hypofractionated radiotherapy in patients with breast cancer.\" Current Problems in Cancer.",
                    "Neiman V, et al. (2022) \"Real-world experience of using dose-dense or dose-intense anthracyclines and taxanes-based treatments for patients with triple-negative breast cancer.\" Current Problems in Cancer.",
                    "Neiman V, et al. (2021) \"Outcome of Patients with Triple-Negative Breast Cancer Treated with Palliative Bevacizumab.\" The Oncologist.",
                    "Neiman V, et al. (2020) \"Efficacy and Toxicity of Dose-dense Doxorubicin and Cyclophosphamide (ddAC) in Patients with Breast Cancer: A Single-Center Experience.\" Clinical Breast Cancer.",
                    "Neiman V, et al. (2019) \"The efficacy and toxicity of angiotensin II receptor blocker in the adjuvant setting for patients with breast cancer: A systematic review.\" Journal of Clinical Oncology."
                  ].map((publication, index) => (
                    <li key={index} className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
                      {publication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Research Interests</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      title: "Personalized Cancer Treatment",
                      description: "Development of individualized treatment approaches based on genetic and molecular profiling of tumors."
                    },
                    {
                      title: "Immunotherapy Optimization",
                      description: "Enhancing efficacy and reducing adverse effects of immunotherapy in various cancer types."
                    },
                    {
                      title: "Cancer in Elderly Patients",
                      description: "Specialized approaches to cancer treatment in geriatric patients, balancing efficacy and quality of life."
                    },
                    {
                      title: "Combination Therapy Protocols",
                      description: "Investigating synergistic effects of combining different treatment modalities for improved outcomes."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-lg text-primary mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy of Care */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 font-serif">My Philosophy of Care</h2>
            <blockquote className="text-xl italic mb-8">
              "Cancer treatment is not just about medical interventions—it's about treating the whole person. Each patient deserves compassion, clear communication, and a treatment plan that respects their individual needs and values."
            </blockquote>
            <p className="mb-8">
              Dr. Neiman's approach to cancer care is guided by several core principles: personalization, compassion, education, and collaboration. She believes in treating each patient as an individual, considering not just their medical condition but their personal preferences, quality of life goals, and support systems.
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary-dark text-white">
              <Link to="/appointment">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
