{
	//顯示公告
	//GET
	//request
	{

	}
	//expected all
	{
		"Announcement_ID":"",
		"Title":"",
		"Post_Time": "",
		"Category": "",
		/*example:{ 
			Announcement_ID: 1,
			Title: '水塔清洗公告', 
			Post_Time: 2024/5/10,
			Category: '最新消息', 
			*/


	}
}
{
	//公告詳細
	//GET
	//request
	{
		"Announcement_ID":"",
	}
	//expected
	{
		"Announcement_ID":"",
		"Title":"",
		"Post_Time": "",
		"Category": "",
		"Content": "",
		"Comment_ID": [],
		"Nick_Name": [],
		"Comment_Time": [],
		"Comment_Contents": [],
		"Reply_Comment_ID": [],
		/*example:{ 
			Announcement_ID: 1,
			Title: '水塔清洗公告', 
			Post_Time: 2024/5/10,
			Category: '最新消息', 
			content: '親愛的住戶您好：...敬上' , 
			Comment_ID:[1, 2], 
			Nick_Name:['劉岩板', '管理員'], 
			Comment_Time:['2024/7/8 16:43', '2024/7/8 21:22'], 
			Content:["為什麼又要洗水塔，又要停水很麻煩欸！", "不好意思，因為近日有颱風造成水質下降，因此管委會決定要再次清洗水塔，對於您的不便，我們深感抱歉。"]}
			Reply_Comment_ID:['NULL', 1]
		*/


	}
}
	

{
	//發佈公告
	//POST
	//request
	{
		"Title":"",
		"Post_Time": "",
		"show_in_calendar":"", 
		"start_date": "", //顯示在行事曆
		"end_date": "",
		"Content": "",
		"Category": "",
	}
	//expected
	{
		
	}
}


{
	//顯示行事曆
	//GET
	//request
	{
		
	}
	//expected
	{
		"Announcement_ID":"",
		"Title":"",
		"start_date": "",
		"end_date": "",
		/*example:{ 
			Announcement_ID: 1,
			Title: '水塔清洗公告', 
			start_date: 2024/5/1, 
			end_date: 2024/5/3 , 
			Reply_Comment_ID:['NULL', 1]
		*/


	}
}

{
	//發佈留言

	//POST
	//request
	{
		"user_id":"",
		"announcement_id":"",
		"reply_comment_id": "",
		"content": "",
		"datetime": "",

		/*example:{ 
			"user_id":"A01",
			"announcement_id":"1",
			"reply_comment_id": "1",
			"content": "辛苦了",
			"datetime": "2024/02/12 21:32",
		*/
	}
	//expected
	{
		


	}
}


{
	//會議室預約

	//POST
	//request
	{
		"user_id":"",
		"facility_id":"",
		"date": "",
		"time_periods": [],

		/*example:{ 
			"user_id":"A01",
			"facility_id": "1",
			"date": "辛苦了",
			"time_periods": ["9:00", "10:00"],
		*/
	}
	//expected
	{
		


	}
}

{
	//會議室紀錄 得到全部公設預約紀錄

	//GET
	//request
	{
		"user_id":"",
	}
	//expected
	{
		
		"user_id":"",
		"facility_id":"",
		"date": "",
		"time_periods": [],

	}
}

{
	//管理費繳交 得到該用戶全部管理費繳交紀錄

	//GET
	//request
	{
		"user_id":"",
	}
	//expected
	{
		
		"topic":"",
		"payment_status":"", //未繳還已繳
		"deadline": "",
		"amount": "",
		"address_sliced": "", //從幾號開始 114號5樓之二之類的
		"payment_date": "",

	}
}


{
	//顯示通知 得到該用戶全部通知

	//GET
	//request
	{
		"user_id":"",
	}
	//expected
	{
		
		"topic":"",
		"datetime":"",
		"notification_id": "",
		"read": "", //有沒有讀了
	}
}

{
	//閱讀通知（更新通知狀態）

	//PUT
	//request
	{
		"user_id":"",
		"notification_id":"",
		"read": "", //有沒有讀了
	}
	//expected
	{
		
	}
}

{
	//發佈通知（更新通知狀態）

	//POST
	//request
	{
		"user_id":"",
		"type":"",
		"content": "",
		"object_ids": "", //通知對象
	}
	//expected
	{
		
	}
}
