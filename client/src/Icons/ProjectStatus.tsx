const ProjectStatus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <rect width="48" height="48" rx="10" fill="#EEF2FF" />
      <rect
        x="7"
        y="10"
        width="10"
        height="12"
        rx="2"
        stroke="#4F46E5"
        stroke-width="2"
      />
      <rect
        x="19"
        y="10"
        width="10"
        height="12"
        rx="2"
        stroke="#4F46E5"
        stroke-width="2"
      />
      <rect
        x="31"
        y="10"
        width="10"
        height="12"
        rx="2"
        stroke="#4F46E5"
        stroke-width="2"
        stroke-dasharray="2 2"
      />
      <path
        d="M12 22v5M24 22v4M36 22v4"
        stroke="#4F46E5"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M12 27h12"
        stroke="#4F46E5"
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle
        cx="24"
        cy="36"
        r="5"
        fill="#EEF2FF"
        stroke="#4F46E5"
        stroke-width="2"
      />
      <path
        d="M24 33.5v2.5l1.5 1"
        stroke="#4F46E5"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ProjectStatus;
