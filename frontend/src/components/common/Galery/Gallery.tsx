import React from "react";
import GalleryCard from "./GalleryCard";

const Gallery: React.FC = () => {
  const cards = [
    {
      title: "Delivering Sustainable Legacies 2024",
      subtitle: "Sustainability Report",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Sustainability+Report",
    },
    {
      title: "Intuit Dome",
      subtitle: "Project",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Intuit+Dome",
    },
    {
      title: "Social Infrastructure",
      subtitle: "Report",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Social+Infrastructure",
    },
    {
      title: "Energy Workforce of the Future",
      subtitle: "Article",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Energy+Workforce",
    },
    {
      title: "AECOM Fellows",
      subtitle: "People",
      imageUrl: "https://via.placeholder.com/800x400.png?text=AECOM+Fellows",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cards.map((card, index) => (
        <GalleryCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
};

export default Gallery;
