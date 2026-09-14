import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { useCartContext } from "../context/CartContext";

function Countdown({ endTime }) {
  const calculateTimeLeft = () => {
    if (!endTime) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const difference = new Date(endTime).getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return <span className="text-red-400 font-medium">Deal expired</span>;
  }

  return (
    <div className="flex items-center gap-1 text-white">
      {timeLeft.days > 0 && (
        <>
          <span className="bg-white/10 px-1.5 py-0.5 rounded">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span>:</span>
        </>
      )}

      <span className="bg-white/10 px-1.5 py-0.5 rounded">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>

      <span>:</span>

      <span className="bg-white/10 px-1.5 py-0.5 rounded">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>

      <span>:</span>

      <span className="bg-white/10 px-1.5 py-0.5 rounded">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function BestDeals() {
  const { addToCart } = useCartContext();

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestDeals = async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          bestDeal: true,
          limit: 8,
        });

        // Only show deals that have not expired
        const activeDeals = (data.products || []).filter((product) => {
          if (!product.dealEndsAt) return true;

          return new Date(product.dealEndsAt).getTime() > Date.now();
        });

        setDeals(activeDeals);
      } catch (error) {
        console.error("Failed to fetch best deals:", error);
        setError("Unable to load best deals.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestDeals();
  }, []);

  const handleGrabDeal = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <section className="bg-[#1a1a1a] py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">Loading best deals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#1a1a1a] py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (deals.length === 0) {
    return (
      <section className="bg-[#1a1a1a] py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            No best deals available right now.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1a1a1a] py-12 px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
          <div>
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#C9B194] mb-1">
              Limited Time
            </p>

            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Best Deals
            </h2>

            <p className="text-gray-500 text-xs mt-1">
              Grab these offers before they disappear.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* DEAL PRODUCTS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((deal) => {
            const discount = deal.discountPercentage || 0;

            return (
              <div
                key={deal._id}
                className="group bg-[#222] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C9B194]/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden bg-[#fdf5ec]">
                  {deal.image ? (
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}

                  {/* DISCOUNT */}
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}

                  {/* COUNTDOWN */}
                  {deal.dealEndsAt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">
                          Ends in
                        </span>

                        <Countdown endTime={deal.dealEndsAt} />
                      </div>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  {/* CATEGORY */}
                  <p className="text-[9px] font-medium text-[#C9B194] uppercase tracking-widest mb-1">
                    {deal.category || "General"}
                  </p>

                  {/* NAME */}
                  <h3 className="text-sm font-medium text-white truncate">
                    {deal.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-lg font-bold text-white">
                      ₹{Number(deal.price || 0).toLocaleString("en-IN")}
                    </span>

                    {deal.originalPrice &&
                      Number(deal.originalPrice) > Number(deal.price) && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{Number(deal.originalPrice).toLocaleString("en-IN")}
                        </span>
                      )}
                  </div>

                  {/* SAVE */}
                  {deal.originalPrice &&
                    Number(deal.originalPrice) > Number(deal.price) && (
                      <p className="text-[10px] text-green-400 mt-1">
                        Save ₹
                        {(
                          Number(deal.originalPrice) - Number(deal.price)
                        ).toLocaleString("en-IN")}
                      </p>
                    )}

                  {/* BUTTON */}
                  <button
                    onClick={() => handleGrabDeal(deal)}
                    className="w-full mt-4 bg-[#C9B194] hover:bg-[#b89e7e] text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
