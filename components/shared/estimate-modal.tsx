'use client';

import { getModalCookies, setModalDisabledCookie } from '@/lib/actions';
import { useState, useEffect, useRef } from 'react';
import EstimateForm from '../forms/estimates';
import { usePathname } from 'next/navigation';

export default function EstimateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname()

  // Check cookies and show modal after 10 seconds
  useEffect(() => {
    async function checkCookies() {
      const { formSubmitted, modalDisabled } = await getModalCookies();
      if (!formSubmitted && !modalDisabled) {
        if (pathName !== '/estimates') {
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 10000);
          return () => clearTimeout(timer);
        }

      }
    }
    checkCookies();
  }, [pathName]);

  const closeModal = async () => {
    setIsOpen(false);
    await setModalDisabledCookie();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className='relative'>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
          onClick={handleOutsideClick}
          role='dialog'
          aria-labelledby='modalTitle'
          aria-hidden={!isOpen}
        >
          <div
            ref={modalRef}
            className='rounded-lg max-w-md w-full mx-4 relative'
            tabIndex={-1}
          >
            <button
              className='absolute top-6 right-6 text-gray-600 text-3xl'
              onClick={closeModal}
              aria-label='Close modal'
            >
              ×
            </button>
            <EstimateForm />
          </div>
        </div>
      )}
    </div>
  );
}
