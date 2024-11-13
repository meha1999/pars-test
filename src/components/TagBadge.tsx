import { TAG_STYLES } from "@/configs/data";

const TagBadge: React.FC<{ tag: string }> = ({ tag }) => {
  const styles = TAG_STYLES[tag];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${styles.bg} ${styles.text}`}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
