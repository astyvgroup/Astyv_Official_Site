import SectionHeading from '../../ui/SectionHeading';
import CaseStudyCard from '../../ui/CaseStudyCard';
import Button from '../../ui/Button';
import siteContent from '../../../config/siteContent';
import { ArrowRight } from 'lucide-react';

export default function CaseStudiesPreview() {
    const { studies } = siteContent.caseStudies;

    return (
        <section className="section-padding bg-dark-secondary">
            <div className="container-custom">
                <SectionHeading title="Featured Work" subtitle="Real engagements, real metrics, real impact." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {studies.slice(0, 3).map((study, i) => (
                        <CaseStudyCard key={study.id} study={study} index={i} />
                    ))}
                </div>
                <div className="text-center">
                    <Button to="/case-studies" variant="secondary" icon={<ArrowRight size={14} />}>
                        View All Case Studies
                    </Button>
                </div>
            </div>
        </section>
    );
}
