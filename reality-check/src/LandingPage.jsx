ADD THIS ABOVE:

const transformations = [ { image: “/images/100.png”, quote: “I’m 61.
I’d never trained properly in my life. Leon didn’t just give me a plan —
he was in my corner every single week. Form videos, check-ins, adjusting
everything around my health conditions. My cholesterol has dropped
significantly, my strength has gone up every single phase, and my
metabolic age came back at 45. I genuinely feel like I’m reversing the
clock.”, name: “MARK, 61 — BUSINESS OWNER, TEXAS”, }, { image:
“/images/8.png”, name: “VINCE” }, { image: “/images/12.png”, name: “SAM”
}, { image: “/images/10.png”, name: “JAKE” }, { image: “/images/6.png”,
name: “MATT” }, { image: “/images/2.png”, name: “LEE” }, { image:
“/images/3.png”, name: “CAINE” },];

PASTE THIS ENTIRE SECTION IMMEDIATELY BEFORE THE “WHAT HAPPENS NEXT?”
SECTION:

<motion.div initial=“hidden” whileInView=“visible” viewport={viewport}
variants={fadeUp} transition={{ duration: 0.6 }} >
REAL CLIENT RESULTS
Real men. Real transformations. No stock photos.
      <img
        src={transformations[0].image}
        alt={transformations[0].name}
        className="w-full rounded-3xl border border-neutral-800"
      />

      <div className="mx-auto mt-8 max-w-4xl text-center">
        <p className="text-xl italic leading-relaxed text-neutral-300">
          "{transformations[0].quote}"
        </p>

        <p className="mt-6 font-black tracking-wider text-amber-500">
          {transformations[0].name}
        </p>
      </div>
    </div>

    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {transformations.slice(1).map((client) => (
        <div
          key={client.name}
          className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900"
        >
          <img
            src={client.image}
            alt={client.name}
            className="w-full"
          />

          <div className="p-5">
            <p className="font-black tracking-wider text-white">
              {client.name}
            </p>
          </div>
        </div>
      ))}
    </div>

</motion.div>
