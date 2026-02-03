import { motion } from 'framer-motion';

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    className = ""
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth sliding
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} // Triggers when 50px of the element is visible
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
