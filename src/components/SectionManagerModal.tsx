import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Eye, EyeOff, Edit2, Check, Plus, Trash2, GripVertical } from 'lucide-react';
import { SectionItem } from '../types';

interface SectionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: SectionItem[];
  onUpdateSections: (newSections: SectionItem[]) => void;
}

export const SectionManagerModal: React.FC<SectionManagerModalProps> = ({
  isOpen,
  onClose,
  sections,
  onUpdateSections,
}) => {
  const [items, setItems] = useState<SectionItem[]>([...sections]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [newSectionName, setNewSectionName] = useState<string>('');

  if (!isOpen) return null;

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setItems(updated);
    onUpdateSections(updated);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setItems(updated);
    onUpdateSections(updated);
  };

  const toggleVisibility = (id: string) => {
    const updated = items.map((sec) => (sec.id === id ? { ...sec, visible: !sec.visible } : sec));
    setItems(updated);
    onUpdateSections(updated);
  };

  const startRename = (sec: SectionItem) => {
    setEditingId(sec.id);
    setEditingName(sec.name);
  };

  const saveRename = (id: string) => {
    if (!editingName.trim()) return;
    const updated = items.map((sec) => (sec.id === id ? { ...sec, name: editingName.trim() } : sec));
    setItems(updated);
    onUpdateSections(updated);
    setEditingId(null);
  };

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    const newId = `custom-section-${Date.now()}`;
    const updated = [...items, { id: newId, name: newSectionName.trim(), visible: true }];
    setItems(updated);
    onUpdateSections(updated);
    setNewSectionName('');
  };

  const handleRemove = (id: string) => {
    const updated = items.filter((sec) => sec.id !== id);
    setItems(updated);
    onUpdateSections(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold">Section Order & Visibility</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <p className="text-xs text-slate-500 mb-2">
            Reorder sections up/down, toggle visibility, or rename section headings to customize your resume flow.
          </p>

          <div className="space-y-2">
            {items.map((sec, index) => {
              const isEditing = editingId === sec.id;
              return (
                <div
                  key={sec.id}
                  className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                    sec.visible
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-slate-100/60 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                    <span className="text-xs font-mono text-slate-400 w-4 text-center">{index + 1}</span>

                    {isEditing ? (
                      <div className="flex items-center gap-1.5 flex-1">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full text-xs font-semibold px-2 py-1 border border-blue-400 rounded bg-white text-slate-900"
                          autoFocus
                        />
                        <button
                          onClick={() => saveRename(sec.id)}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className={`font-semibold truncate ${sec.visible ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                        {sec.name}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleVisibility(sec.id)}
                      className={`p-1.5 rounded transition-colors ${
                        sec.visible ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={sec.visible ? 'Hide section' : 'Show section'}
                    >
                      {sec.visible ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => startRename(sec)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors"
                      title="Rename section"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 rounded transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      disabled={index === items.length - 1}
                      onClick={() => moveDown(index)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 rounded transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {sec.id.startsWith('custom-section-') && (
                      <button
                        onClick={() => handleRemove(sec.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                        title="Delete custom section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add custom section */}
          <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="e.g. Publications, Volunteer Work, Patents"
              className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
            />
            <button
              onClick={handleAddSection}
              className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Section
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Apply Layout
          </button>
        </div>
      </div>
    </div>
  );
};
