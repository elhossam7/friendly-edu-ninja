import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "School Principal",
      content: "EduManager has transformed how we manage our institution. The automated systems have saved us countless hours of administrative work.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Jane Smith",
      role: "Administrator",
      content: "The automation features save us countless hours every week. The support team is always there when we need them.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Mike Johnson",
      role: "Department Head",
      content: "An invaluable tool for modern educational institutions. The interface is intuitive and our staff needed minimal training.",
      rating: 5,
      image: "/placeholder.svg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          What Our Users Say
        </h2>
        <Carousel className="max-w-xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="mx-4">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg mb-4">{testimonial.content}</p>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};