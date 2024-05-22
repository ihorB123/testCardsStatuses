import { useEffect, useState, useRef } from "react";
import {DEFAULT_COLOR, statusColors} from "../../constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./StatusCard.scss"

const StatusCard = ({ status, title, description, isExpandedAll }) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedAll);
    const [isExpandable, setIsExpandable] = useState(false);
    const statusColor = statusColors[status] || DEFAULT_COLOR;
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const isOverflowing = descriptionRef.current.scrollWidth > descriptionRef.current.clientWidth ||
                descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setIsExpandable(isOverflowing);
        }
    }, [description]);

    useEffect(() => {
        setIsExpanded(isExpandedAll);
    }, [isExpandedAll]);

    const toggleExpand = () => {
        if (isExpandable) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className={`status-card ${isExpanded ? "status-card--expanded" : "status-card--truncated"}`} style={{ borderLeftColor: statusColor }} onClick={toggleExpand}>
            <div className="status-card__header">
                <div className="status-card__title">{title}</div>
                {isExpandable && (
                    <div className="status-card__logo">
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                )}
            </div>
            <div className="status-card__status">{status}</div>
            {description && (
                <div ref={descriptionRef} className={`status-card__description ${isExpanded ? "status-card__description--expanded" : "status-card__description--truncated"}`}>
                    {description}
                </div>
            )}
        </div>
    );
};

export default StatusCard;
