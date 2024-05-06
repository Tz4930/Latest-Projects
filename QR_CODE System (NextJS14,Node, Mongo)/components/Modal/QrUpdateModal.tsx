import { Modal, notification } from 'antd';
import { useState } from 'react';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}

const IndividualModal: React.FC<CustomModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [medium, setMedium] = useState<string | null>(null);
  const [campaignStart, setCampaignStart] = useState<Date | null>(null);
  const [campaignEnd, setCampaignEnd] = useState<Date | null>(null);
  const [tag, setTag] = useState<string | null>(null);


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send data to the API
      const response = await fetch('/api/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  medium, campaignStart, campaignEnd, tag }),
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      onClose(); // Close the modal on success
      notification.success({
        message: 'Success',
        description: 'Folder Created Successfully',
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Update Changes"
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      style={{ maxWidth: 500 }}
    >
      <form onSubmit={handleFormSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="medium">
            Medium
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="medium"
            value={medium || ''}
            onChange={(e) => setMedium(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="tag">
            Tag
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="tag"
            value={tag || ''}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="campaignStart">
            Campaign Start
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="campaignStart"
            value={campaignStart?.toISOString().split('T')[0] || ''}
            onChange={(e) => setCampaignStart(new Date(e.target.value))}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="campaignEnd">
            Campaign End
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="campaignEnd"
            value={campaignEnd?.toISOString().split('T')[0] || ''}
            onChange={(e) => setCampaignEnd(new Date(e.target.value))}
          />
        </div>
        
        <div>
          <br />
          <button
            type="submit"
            disabled={loading}
            className="flex w-full h-11 justify-center items-center gap-2.5 rounded px-4 py-2 bg-[#00BFFF] font-manrope text-white text-base not-italic font-bold leading-[normal]"
          >
            Update Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default IndividualModal;
