// components/CustomModal.tsx
import {Modal,notification } from 'antd';
import { useState } from 'react';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}

const TagModal: React.FC<CustomModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [folderName, setfolderName] = useState('');

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfolderName(e.target.value);
  };

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
        body: JSON.stringify({ folderName: folderName }),
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      onClose(); // Close the modal on success
      notification.success({
        message: "Success",
        description: "Folder Created Successfully",
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Enter Folder Name"
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      style={{ maxWidth: 500 }}
    >
      <form onSubmit={handleFormSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="tag">Folder Name </label>
          <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            id="tag"
            value={folderName}
            onChange={handleTagChange}
            required
          />
        </div>
        <div>
            <br />
          <button type="submit" disabled={loading}
             className="flex w-[132px] h-11 justify-center items-center gap-2.5 rounded px-4 py-2 bg-[#00BFFF] font-manrope text-white text-base not-italic font-bold leading-[normal]"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TagModal;
