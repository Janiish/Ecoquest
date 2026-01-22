/**
 * Unit test for QuestCard component
 * Tests rendering, props, interactions, and styling
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import QuestCard from '../QuestCard';

describe('QuestCard Component', () => {
  const mockProps = {
    id: '1',
    title: 'Plant a Tree',
    description: 'Plant a tree in your community',
    xp: 50,
    difficulty: 'easy' as const,
    completed: false,
    onOpenUpload: vi.fn(),
  };

  it('renders quest title and description', () => {
    render(<QuestCard {...mockProps} />);
    expect(screen.getByText('Plant a Tree')).toBeInTheDocument();
    expect(screen.getByText('Plant a tree in your community')).toBeInTheDocument();
  });

  it('displays XP badge', () => {
    render(<QuestCard {...mockProps} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('shows difficulty pill with correct styling', () => {
    render(<QuestCard {...mockProps} />);
    const difficultyElement = screen.getByText(/easy/i);
    expect(difficultyElement).toBeInTheDocument();
  });

  it('expands on click', async () => {
    const user = userEvent.setup();
    render(<QuestCard {...mockProps} />);
    const card = screen.getByRole('button');
    
    expect(card).toHaveAttribute('aria-expanded', 'false');
    await user.click(card);
    expect(card).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onOpenUpload when submit button clicked', async () => {
    const user = userEvent.setup();
    const mockOnOpenUpload = vi.fn();
    render(<QuestCard {...mockProps} onOpenUpload={mockOnOpenUpload} />);
    
    // Expand the card first
    await user.click(screen.getByRole('button'));
    
    // Click submit button
    const submitButton = screen.getByText(/Submit Proof/i);
    await user.click(submitButton);
    
    expect(mockOnOpenUpload).toHaveBeenCalledWith('1');
  });

  it('shows completion indicator when completed', () => {
    render(<QuestCard {...mockProps} completed={true} />);
    expect(screen.getByLabelText('Completed')).toBeInTheDocument();
  });

  it('hides submit button when completed', async () => {
    const user = userEvent.setup();
    render(<QuestCard {...mockProps} completed={true} />);
    
    // Expand card
    await user.click(screen.getByRole('button'));
    
    // Submit button should not exist
    expect(screen.queryByText(/Submit Proof/i)).not.toBeInTheDocument();
  });

  it('responds to keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<QuestCard {...mockProps} />);
    const card = screen.getByRole('button');
    
    card.focus();
    await user.keyboard('{Enter}');
    expect(card).toHaveAttribute('aria-expanded', 'true');
  });

  it('displays correct difficulty emoji', () => {
    const { rerender } = render(<QuestCard {...mockProps} difficulty="easy" />);
    expect(screen.getByText('🌱')).toBeInTheDocument();
    
    rerender(<QuestCard {...mockProps} difficulty="medium" />);
    expect(screen.getByText('🌿')).toBeInTheDocument();
    
    rerender(<QuestCard {...mockProps} difficulty="hard" />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });
});
