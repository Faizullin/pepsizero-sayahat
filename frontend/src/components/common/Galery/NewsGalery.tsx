export default function NewsGallery() {
    return (
      <div> 

      <h2 className="text-3xl font-bold text-teal-600 text-center pt-5 sm:text-4xl">News</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8 sm:px-6 md:px-8 lg:px-10">
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/800x500?text=Breaking+News"
              alt="News Image"
              width={800}
              height={500}
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Breaking News: Major Earthquake Hits Region</h3>
            <p className="text-muted-foreground line-clamp-3">
              A powerful earthquake has struck the region, causing widespread damage and disruption. Emergency services are on the scene and rescue efforts are underway.
            </p>
          </div>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300?text=Tech+Giant"
              alt="News Image"
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Tech Giant Announces Major Acquisition</h3>
            <p className="text-muted-foreground line-clamp-3">
              In a surprise move, the tech giant has announced the acquisition of a smaller competitor, sparking speculation about the company's future plans.
            </p>
          </div>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300?text=New+Study"
              alt="News Image"
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">New Study Reveals Surprising Findings</h3>
            <p className="text-muted-foreground line-clamp-3">
              A recently published study has uncovered some unexpected results, challenging long-held assumptions in the field. Experts are already debating the implications.
            </p>
          </div>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300?text=Community+Support"
              alt="News Image"
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Local Community Comes Together to Support Families in Need</h3>
            <p className="text-muted-foreground line-clamp-3">
              In a heartwarming display of community spirit, residents have rallied together to provide aid and support to families facing difficult circumstances.
            </p>
          </div>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/800x500?text=Medical+Advancement"
              alt="News Image"
              width={800}
              height={500}
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Groundbreaking Medical Advancement Announced</h3>
            <p className="text-muted-foreground line-clamp-3">
              Researchers have unveiled a revolutionary new treatment that could significantly improve the lives of those suffering from a debilitating condition.
            </p>
          </div>
        </div>
        <div className="bg-background rounded-lg overflow-hidden shadow-lg col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 group">
          <div className="overflow-hidden">
            <img
              src="https://via.placeholder.com/400x300?text=Inspiring+Story"
              alt="News Image"
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Inspiring Story of Resilience and Triumph</h3>
            <p className="text-muted-foreground line-clamp-3">
              In the face of adversity, one individual has shown remarkable strength and determination, inspiring others with their incredible journey.
            </p>
          </div>
        </div>
      </section>
      </div>
    );
  }
  