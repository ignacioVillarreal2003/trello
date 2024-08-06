INSERT INTO "Teams" ("TeamName", "Theme") VALUES
                                        ('Team Alpha', 'Dark'),
                                        ('Team Beta', 'Light'),
                                        ('Team Gamma', 'Colorful'),
                                        ('Team Delta', 'Minimalist'),
                                        ('Team Epsilon', 'Retro'),
                                        ('Team Zeta', 'Modern'),
                                        ('Team Eta', 'Classic'),
                                        ('Team Theta', 'Futuristic'),
                                        ('Team Iota', 'Elegant'),
                                        ('Team Kappa', 'Vibrant');

INSERT INTO "Users" ("Email", "Password", "Username") VALUES
                                                  ('alice@example.com', 'password123', 'Alice'),
                                                  ('bob@example.com', 'password456', 'Bob'),
                                                  ('carol@example.com', 'password789', 'Carol'),
                                                  ('dave@example.com', 'password321', 'Dave'),
                                                  ('eve@example.com', 'password654', 'Eve'),
                                                  ('frank@example.com', 'password987', 'Frank'),
                                                  ('grace@example.com', 'password147', 'Grace'),
                                                  ('heidi@example.com', 'password258', 'Heidi'),
                                                  ('ivan@example.com', 'password369', 'Ivan'),
                                                  ('judy@example.com', 'password741', 'Judy');

INSERT INTO "Boards" ("BoardTitle", "TeamName", "Theme") VALUES
                                                     ('Project Management', 'Team Alpha', 'Agile'),
                                                     ('Design Ideas', 'Team Beta', 'Creative'),
                                                     ('Marketing Campaign', 'Team Gamma', 'Bold'),
                                                     ('Development Plan', 'Team Delta', 'Structured'),
                                                     ('Product Roadmap', 'Team Epsilon', 'Strategic'),
                                                     ('Sales Strategy', 'Team Zeta', 'Dynamic'),
                                                     ('Customer Feedback', 'Team Eta', 'Insightful'),
                                                     ('Resource Allocation', 'Team Theta', 'Efficient'),
                                                     ('Financial Overview', 'Team Iota', 'Clear'),
                                                     ('Competitor Analysis', 'Team Kappa', 'Detailed');

INSERT INTO "Lists" ("BoardId", "ListTitle") VALUES
                                           (1, 'To Do'),
                                           (1, 'In Progress'),
                                           (1, 'Done'),
                                           (2, 'Concepts'),
                                           (2, 'Designs'),
                                           (2, 'Finalized'),
                                           (3, 'Research'),
                                           (3, 'Execution'),
                                           (3, 'Review'),
                                           (4, 'Planning'),
                                           (4, 'Development'),
                                           (4, 'Testing'),
                                           (5, 'Features'),
                                           (5, 'Milestones'),
                                           (5, 'Launch'),
                                           (6, 'Leads'),
                                           (6, 'Prospects'),
                                           (6, 'Closed'),
                                           (7, 'Suggestions'),
                                           (7, 'Issues'),
                                           (7, 'Resolved'),
                                           (8, 'Budget'),
                                           (8, 'Staffing'),
                                           (8, 'Timeline'),
                                           (9, 'Quarterly'),
                                           (9, 'Yearly'),
                                           (9, 'Forecast'),
                                           (10, 'Trends'),
                                           (10, 'Market Share'),
                                           (10, 'Opportunities');

INSERT INTO "Cards" ("CardTitle", "Description", "Start", "End", "ListId") VALUES
                                                                   ('Setup Meeting', 'Initial setup meeting with stakeholders.', '2024-08-01', '2024-08-01', 1),
                                                                   ('Design Mockups', 'Create design mockups for the new feature.', '2024-08-02', '2024-08-05', 2),
                                                                   ('Review Code', 'Code review for the latest changes.', '2024-08-06', '2024-08-08', 3),
                                                                   ('Draft Proposal', 'Draft the proposal for the upcoming project.', '2024-08-09', '2024-08-10', 4),
                                                                   ('Budget Approval', 'Get approval for the budget allocation.', '2024-08-11', '2024-08-12', 5),
                                                                   ('Client Feedback', 'Collect and analyze client feedback.', '2024-08-13', '2024-08-14', 6),
                                                                   ('Market Research', 'Conduct research on current market trends.', '2024-08-15', '2024-08-16', 7),
                                                                   ('Finalize Report', 'Complete and finalize the project report.', '2024-08-17', '2024-08-18', 8),
                                                                   ('Team Training', 'Organize training sessions for the new tools.', '2024-08-19', '2024-08-20', 9),
                                                                   ('Performance Review', 'Conduct performance reviews for the team.', '2024-08-21', '2024-08-22', 10);

INSERT INTO "Labels" ("LabelTitle", "Color") VALUES
                                                 ('Urgent', 'Red'),
                                                 ('Design', 'Blue'),
                                                 ('Review', 'Green'),
                                                 ('Proposal', 'Yellow'),
                                                 ('Budget', 'Purple'),
                                                 ('Feedback', 'Orange'),
                                                 ('Research', 'Pink'),
                                                 ('Report', 'Cyan'),
                                                 ('Training', 'Magenta'),
                                                 ('Performance', 'Gray');

INSERT INTO "CardLabels" ("CardId", "LabelTitle", "Color") VALUES
                                                       (1, 'Urgent', 'Red'),
                                                       (2, 'Design', 'Blue'),
                                                       (3, 'Review', 'Green'),
                                                       (4, 'Proposal', 'Yellow'),
                                                       (5, 'Budget', 'Purple'),
                                                       (6, 'Feedback', 'Orange'),
                                                       (7, 'Research', 'Pink'),
                                                       (8, 'Report', 'Cyan'),
                                                       (9, 'Training', 'Magenta'),
                                                       (10, 'Performance', 'Gray');

INSERT INTO "CardUsers" ("CardId", "UserEmail") VALUES
                                              (1, 'alice@example.com'),
                                              (1, 'bob@example.com'),
                                              (2, 'carol@example.com'),
                                              (3, 'dave@example.com'),
                                              (4, 'eve@example.com'),
                                              (5, 'frank@example.com'),
                                              (6, 'grace@example.com'),
                                              (7, 'heidi@example.com'),
                                              (8, 'ivan@example.com'),
                                              (9, 'judy@example.com');

INSERT INTO "Comments" ("CardId", "CommentDate", "CommentDescription") VALUES 
                                                                   (1, '2024-08-01', 'Meeting scheduled for today.'),
                                                                   (2, '2024-08-03', 'Mockups are looking good.'),
                                                                   (3, '2024-08-07', 'Code review completed successfully.'),
                                                                   (4, '2024-08-09', 'Proposal draft is ready for review.'),
                                                                   (5, '2024-08-12', 'Budget approved by the finance team.'),
                                                                   (6, '2024-08-13', 'Feedback received and analyzed.'),
                                                                   (7, '2024-08-15', 'Market research report is in progress.'),
                                                                   (8, '2024-08-18', 'Project report finalized and submitted.'),
                                                                   (9, '2024-08-19', 'Training sessions scheduled for next week.'),
                                                                   (10, '2024-08-21', 'Performance reviews completed for the team.');

INSERT INTO "UserTeams" ("UserEmail", "TeamName") VALUES
                                                ('alice@example.com', 'Team Alpha'),
                                                ('bob@example.com', 'Team Beta'),
                                                ('carol@example.com', 'Team Gamma'),
                                                ('dave@example.com', 'Team Delta'),
                                                ('eve@example.com', 'Team Epsilon'),
                                                ('frank@example.com', 'Team Zeta'),
                                                ('grace@example.com', 'Team Eta'),
                                                ('heidi@example.com', 'Team Theta'),
                                                ('ivan@example.com', 'Team Iota'),
                                                ('judy@example.com', 'Team Kappa');
