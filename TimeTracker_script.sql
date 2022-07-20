create database TimeTrackerDB
use TimeTrackerDB

create table [Users] 
(
	[Id] int primary key identity(1, 1),
	[Email] nvarchar(100) not null,
	[Password] nvarchar not null,
	[LastName] nvarchar(50),
	[FirstName] nvarchar(50),
	[WeeklyWorkingTime] int default 2400,
	[RemainingVacationDays] int default 30,
	[PrivilegesValue] int default 0
)

create table [Records]
(
	[Id] int primary key identity(1, 1),
	[WorkingTime] int default 480,
	[Comment] text,
	[CreatorId] int foreign key references [Users]([Id]) on delete no action,
	[EditorId] int foreign key references [Users]([Id]) on delete no action,
	[CreatedAt] datetime default getdate(),
)

create table [VacationRequests]
(
	[Id] int primary key identity(1, 1),
	[UserId] int foreign key references [Users]([Id]) on delete no action,
	[StartingTime] date not null,
	[EndingTime] date not null,
	[Comment] text
)

create table [AuthentificationTokens] 
(
	[Id] int primary key identity(1, 1),
	[UserId] int not null foreign key references [Users]([Id]) on delete cascade,
	[Token] nvarchar not null
)