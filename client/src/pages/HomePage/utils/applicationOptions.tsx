import Branding from '../../../Icons/Branding';
import FileSharing from '../../../Icons/FileSharing';
import Invoicing from '../../../Icons/Invoicing';
import Messaging from '../../../Icons/Messaging';
import ProjectStatus from '../../../Icons/ProjectStatus';
import SecureAccess from '../../../Icons/SecureAccess';

const applicationsOptions = [
  {
    icon: <FileSharing />,
    title: 'File Sharing',
    description: 'Upload once. Your client downloads any time, on any device.',
  },
  {
    icon: <ProjectStatus />,
    title: 'Project Status',
    description: 'Visual task board so clients always know where things stand.',
  },
  {
    icon: <Messaging />,
    title: 'Messaging',
    description: 'One thread per client. No more WhatsApp chaos.',
  },
  {
    icon: <Invoicing />,
    title: 'Invoicing',
    description: 'Send invoices and get paid via Stripe, built right in.',
  },
  {
    icon: <Branding />,
    title: 'Your Branding',
    description: 'Your logo and colours on every portal your clients see.',
  },
  {
    icon: <SecureAccess />,
    title: 'Secure Access',
    description: 'Magic link login — no password headaches for clients.',
  },
];

export default applicationsOptions;
