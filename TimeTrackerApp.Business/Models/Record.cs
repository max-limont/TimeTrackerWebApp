using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTrackerApp.Business.Models
{
	public class Record
	{
		private readonly static int defaultWorkingTime = 8 * 60; // 8 hours * 60 minutes

		public int Id { get; set; }
		public int WorkingTime { get; set; }
		public string Comment { get; set; } = string.Empty;
		public int? EditorId { get; set; } = null;
		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}
