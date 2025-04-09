
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ResearchSection = () => {
  return (
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
  );
};

export default ResearchSection;
