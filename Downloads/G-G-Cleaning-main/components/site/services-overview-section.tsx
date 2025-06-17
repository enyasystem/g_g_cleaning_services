import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building, SprayCan, TreePine, Wrench, Sun } from "lucide-react"
import ScrollRevealWrapper from "@/components/motion/scroll-reveal-wrapper"

const services = [
	{
		icon: <Home className="w-10 h-10 text-primary mb-4" />,
		title: "Residential Cleaning",
		description:
			"Comprehensive cleaning services for your home, ensuring a spotless and healthy living space.",
	},
	{
		icon: <Building className="w-10 h-10 text-primary mb-4" />,
		title: "Commercial Cleaning",
		description:
			"Professional cleaning for offices, retail spaces, and other commercial properties.",
	},
	{
		icon: <SprayCan className="w-10 h-10 text-primary mb-4" />,
		title: "Deep Cleaning",
		description:
			"Thorough, top-to-bottom cleaning for a truly immaculate environment.",
	},
	// {
	// 	icon: <Sun className="w-10 h-10 text-primary mb-4" />,
	// 	title: "Window Cleaning",
	// 	description:
	// 		"Streak-free window cleaning for sparkling clear views, inside and out.",
	// },
	// {
	//   icon: <TreePine className="w-10 h-10 text-primary mb-4" />,
	//   title: "Garden Maintenance",
	//   description: "Keep your outdoor spaces beautiful with our expert garden care services.",
	// },
	// {
	// 	icon: <Wrench className="w-10 h-10 text-primary mb-4" />,
	// 	title: "Handyman Services",
	// 	description:
	// 		"Reliable solutions for minor repairs and maintenance tasks around your property.",
	// },
]

export default function ServicesOverviewSection() {
	return (
		<section id="services" className="py-16 md:py-24 bg-muted/40">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<ScrollRevealWrapper animationType="fadeInUp" delay={0.1}>
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">
							Our Services
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							We provide a wide range of cleaning and maintenance solutions to
							meet your every need.
						</p>
					</div>
				</ScrollRevealWrapper>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => {
						let cardClass =
							"text-center h-full transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
						// Specifically extend the Handyman Services card
						if (service.title === "Handyman Services") {
							cardClass += " md:col-span-2 lg:col-span-3"
						}
						return (
							<ScrollRevealWrapper
								key={service.title}
								animationType="fadeInUp"
								delay={0.2 + index * 0.1} // Stagger animation for cards
							>
								<Card className={cardClass}>
									<CardHeader>
										<div className="flex justify-center">{service.icon}</div>
										<CardTitle>{service.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">
											{service.description}
										</p>
									</CardContent>
								</Card>
							</ScrollRevealWrapper>
						)
					})}
				</div>
			</div>
		</section>
	)
}
