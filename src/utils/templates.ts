import type { PromptTemplate } from '../types';

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'code-generation',
    name: 'Code Generation',
    description: 'Template for generating code snippets',
    template: `Task: [Describe what you want to build]
Language/Framework: [Specify technology]
Requirements:
- [Requirement 1]
- [Requirement 2]
Context: [Any additional context]
Expected Output: [What you expect to receive]`,
  },
  {
    id: 'explanation',
    name: 'Concept Explanation',
    description: 'Template for explaining technical concepts',
    template: `Explain: [Concept name]
Target Audience: [Beginner/Intermediate/Advanced]
Focus Areas:
- [Aspect 1]
- [Aspect 2]
Include Examples: [Yes/No]
Length: [Brief/Detailed]`,
  },
  {
    id: 'debugging',
    name: 'Debugging Help',
    description: 'Template for debugging issues',
    template: `Issue: [Brief description of the problem]
Error Message: [Exact error message if any]
Code Context:
\`\`\`
[Paste relevant code]
\`\`\`
What I've Tried:
- [Attempt 1]
- [Attempt 2]
Expected Behavior: [What should happen]
Actual Behavior: [What is happening]`,
  },
  {
    id: 'research',
    name: 'Research Query',
    description: 'Template for research and information gathering',
    template: `Research Topic: [Your topic]
Specific Questions:
1. [Question 1]
2. [Question 2]
Depth Level: [Overview/Detailed Analysis]
Focus Areas: [Specific aspects to explore]
Sources: [Any preferred sources or constraints]`,
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'Template for creative content generation',
    template: `Type: [Story/Article/Blog Post/etc.]
Topic/Theme: [Main subject]
Tone: [Professional/Casual/Humorous/etc.]
Length: [Word count or size]
Key Points to Include:
- [Point 1]
- [Point 2]
Audience: [Target readers]`,
  },
  {
    id: 'review-feedback',
    name: 'Code/Content Review',
    description: 'Template for getting feedback',
    template: `What to Review: [Code/Document/Content]
Content:
\`\`\`
[Paste content here]
\`\`\`
Focus Areas:
- [Area 1: e.g., Performance]
- [Area 2: e.g., Best Practices]
- [Area 3: e.g., Security]
Specific Concerns: [Any particular issues]
Context: [Additional background]`,
  },
];
