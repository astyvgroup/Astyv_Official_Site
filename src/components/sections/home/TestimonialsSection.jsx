import SectionHeading from '../../ui/SectionHeading';
import TestimonialSlider from '../../ui/TestimonialSlider';

export default function TestimonialsSection() {
    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <SectionHeading title="What Our Clients Say" subtitle="Don't take our word for it — hear from the leaders we've partnered with." />
                <TestimonialSlider />
            </div>
        </section>
    );
}
