import { motion } from "framer-motion"

function AnimatedButton({
    children,
    stiffness = 300,
    damping = 15,
    style,
    onClickFunction,
    whileHover
}) {
    return (
        <motion.button
            onClick={onClickFunction}
            whileHover={whileHover}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, type: 'spring', stiffness, damping }}
            className={style}
            >
            {children}
        </motion.button>
    );
}

export default AnimatedButton;