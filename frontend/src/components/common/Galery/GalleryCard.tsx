import React from "react";

interface GalleryCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative overflow-hidden group h-full">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 w-full">
        <p className="text-green-400 font-semibold">{subtitle}</p>
        <h2 className="text-white text-lg font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default GalleryCard;
