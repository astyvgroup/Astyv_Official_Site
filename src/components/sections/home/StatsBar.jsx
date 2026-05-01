import StatCounter from '../../ui/StatCounter';
import siteContent from '../../../config/siteContent';

export default function StatsBar() {
    const { stats } = siteContent.home;

    return (
        <section className="py-16 lg:py-24 bg-dark-secondary border-y border-white/5">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, i) => (
                        <StatCounter key={stat.label} {...stat} delay={i * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    );
}
