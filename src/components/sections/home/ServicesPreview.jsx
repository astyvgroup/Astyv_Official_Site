import SectionHeading from '../../ui/SectionHeading';
import ServiceCard from '../../ui/ServiceCard';
import siteContent from '../../../config/siteContent';

export default function ServicesPreview() {
    const { servicesPreview } = siteContent.home;

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <SectionHeading title={servicesPreview.heading} subtitle={servicesPreview.subheading} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesPreview.items.map((item, i) => (
                        <ServiceCard key={item.title} {...item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
