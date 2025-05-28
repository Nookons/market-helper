import React, { FC } from 'react';

interface MySkeletonProps {
    isFullWidth?: boolean;
    width?: number; // in pixels
    height: number; // in pixels
}

const MySkeleton: FC<MySkeletonProps> = ({ isFullWidth, width, height }) => {
    const style = {
        width: isFullWidth ? '100%' : width ? `${width}px` : undefined,
        height: `${height}px`,
    };

    return (
        <div
            className="dark:bg-neutral-800 bg-neutral-400 rounded-2xl animate-pulse"
            style={style}
        />
    );
};

export default MySkeleton;
