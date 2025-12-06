import fire from "../assets/fire.png";
import laptop from "../assets/laptop.png";
import user from "../assets/user.png";

const Lower = () => {
  return (
    <div className="w-full bg-white py-20 px-10">
      <div className="text-center mb-16">
        <h2 className="font-instrument text-5xl font-bold mb-4">
          Why Snip-Shell?
        </h2>
        <p className="font-satoshi text-xl text-gray-600">
          Unlock your ideas, organize your thoughts, and watch them grow
          effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={fire} alt="Organize" className="w-24 h-24 mb-4" />
          <h3 className="font-instrument text-2xl font-bold mb-2">Organize</h3>
          <p className="font-satoshi text-gray-600">
            Quickly capture and categorize your thoughts with an intuitive
            interface.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={laptop} alt="Grow" className="w-24 h-24 mb-4" />
          <h3 className="font-instrument text-2xl font-bold mb-2">Grow</h3>
          <p className="font-satoshi text-gray-600">
            Connect ideas and expand them effortlessly using smart suggestions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={user} alt="Share" className="w-24 h-24 mb-4" />
          <h3 className="font-instrument text-2xl font-bold mb-2">Share</h3>
          <p className="font-satoshi text-gray-600">
            Collaborate and share your thoughts seamlessly with friends or
            teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lower;
