CREATE DATABASE Library;

USE Library;

-- Create the Books table
CREATE TABLE Books (
  BookID INT PRIMARY KEY,
  Title VARCHAR(100),
  Author VARCHAR(100),
  PublicationYear INT,
  Status VARCHAR(20)
);

-- Create the Members table
CREATE TABLE Members (
  MemberID INT PRIMARY KEY,
  Name VARCHAR(100),
  Address VARCHAR(100),
  ContactNumber VARCHAR(20)
);

-- Create the Loans table
CREATE TABLE Loans (
  LoanID INT PRIMARY KEY,
  BookID INT,
  MemberID INT,
  LoanDate DATE,
  ReturnDate DATE,
  FOREIGN KEY (BookID) REFERENCES Books (BookID),
  FOREIGN KEY (MemberID) REFERENCES Members (MemberID)
);

-- Inserting sample data into the Books table
INSERT INTO Books (BookID, Title, Author, PublicationYear, Status)
VALUES
  (1, 'Book 1', 'Author 1', 2020, 'Available'),
  (2, 'Book 2', 'Author 2', 2018, 'Available'),
  (3, 'Book 3', 'Author 3', 2015, 'Available'),
  (4, 'Book 4', 'Author 4', 2019, 'Available'),
  (5, 'Book 5', 'Author 5', 2021, 'Available');

SELECT * FROM Books;
-- Inserting sample data into the Members table
INSERT INTO Members (MemberID, Name, Address, ContactNumber)
VALUES
  (1, 'Member 1', 'Address 1', '1234567890'),
  (2, 'Member 2', 'Address 2', '9876543210'),
  (3, 'Member 3', 'Address 3', '4567890123'),
  (4, 'Member 4', 'Address 4', '7890123456');

SELECT * FROM Members;
-- Inserting sample data into the Loans table
INSERT INTO Loans (LoanID, BookID, MemberID, LoanDate, ReturnDate)
VALUES
  (1, 1, 1, '2023-05-01', '2023-05-15'),
  (2, 2, 2, '2023-05-02', '2023-05-16'),
  (3, 3, 3, '2023-05-03', '2023-05-17'),
  (4, 4, 1, '2023-05-04', '2023-05-18'),
  (5, 5, 2, '2023-05-05', '2023-05-19');

SELECT * FROM Loans;
