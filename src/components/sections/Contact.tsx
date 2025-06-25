import { motion } from "framer-motion";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import ProfileCard from "../ProfileCard";

const Contact = () => {
  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <Header useMotion={false} {...config.contact} />
        <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">Email functionality has been removed for simplicity.</p>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 flex flex-col items-center justify-center gap-10"
      >
        <div className="h-[350px] md:h-[550px] xl:h-auto w-full flex items-center justify-center">
            <EarthCanvas />
        </div>
        <ProfileCard
          name="Jevon"
          title="Captain Pirate"
          handle="jevon.n.shield"
          status="Online"
          contactText="Contact"
          avatarUrl="/jevon.png"
          miniAvatarUrl="/jevon.png"
          iconUrl="/insta.png"
          grainUrl="/insta.png"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => console.log('Contact clicked')}
          className="mb-10"
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
