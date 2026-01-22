/**
 * Unit Tests for QuestCard Component
 * Tests using Vitest and React Testing Library
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import QuestCard from '../components/QuestCard';

describe('QuestCard', () => {
  const mockOnOpenUpload = vi.fn();

  const defaultProps = {
    id: 'quest-1',
    title: 'Plant a Tree',
    description: 'Plant a tree in your community',
    xp: 50,
    difficulty: 'easy' as const,
    completed: false,
    onOpenUpload: mockOnOpenUpload,
  };

  it('renders quest information correctly', () => {
    render(<QuestCard {...defaultProps} />);

    expect(screen.getByText('Plant a Tree')).toBeInTheDocument();
    expect(screen.getByText('Plant a tree in your community')).toBeInTheDocument();
    expect(screen.getByText('+50 XP')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('shows correct button text when not completed', () => {
    render(<QuestCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /submit proof/i });
    expect(button).toBeEnabled();
  });

  it('shows completed state when quest is completed', () => {
    render(<QuestCard {...defaultProps} completed={true} />);

    const button = screen.getByRole('button', { name: /completed/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('calls onOpenUpload when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuestCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /submit proof/i });
    await user.click(button);

    expect(mockOnOpenUpload).toHaveBeenCalledWith('quest-1');
  });

  it('displays correct difficulty color', () => {
    const { container } = render(<QuestCard {...defaultProps} difficulty="hard" />);

    const difficultyBadge = container.querySelector('.bg-red-100');
    expect(difficultyBadge).toBeInTheDocument();
  });

  it('applies eco-500 border when completed', () => {
    const { container } = render(<QuestCard {...defaultProps} completed={true} />);

    const card = container.querySelector('.border-eco-500');
    expect(card).toBeInTheDocument();
  });
});
