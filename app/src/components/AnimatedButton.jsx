import { motion } from "framer-motion"

function AnimatedButton({
    children,
    stiffness = 300,
    damping = 15,
    style,
    onClickFunction
}) {
    return (
        <motion.button
            onClick={onClickFunction}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, type: 'spring', stiffness, damping }}
            className={style}
            >
            {children}
        </motion.button>
    );
}

export default AnimatedButton;