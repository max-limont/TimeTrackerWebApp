using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTrackerApp.Business.Models
{
    public class ExportUserDataItem
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string WorkType { get; set; } = "Full-time";
        public int WorkingTime { get; set; }

        public ExportUserDataItem(string email, string fName, string lName, bool isFullTime, int workingTime)
        {
            Email = email;
            FirstName = fName;
            LastName = lName;
            WorkingTime = workingTime;
            WorkType = isFullTime ? "Full-time" : "Part-time";
        }
        public ExportUserDataItem(User user, int workingTime)
        {
            Email = user.Email;
            FirstName = user.FirstName;
            LastName = user.LastName;
            WorkingTime = workingTime;
            WorkType = user.IsFullTimeEmployee ? "Full-time" : "Part-time";
        }
    }
}
