import { motion } from "framer-motion";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import ProfileCard from "../ProfileCard";

const Contact = () => {
  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 flex flex-col items-center justify-center gap-10"
      >
        <div className="h-[300px] md:h-[400px] xl:h-auto w-full flex items-center justify-center">
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
          grainUrl="src/assets/logo.png"
          showUserInfo={true}
          enableTilt={true}
          className="mb-20"
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
