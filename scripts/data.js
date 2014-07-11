// var root = {
// 	name: "Dashboards",
// 	id: "123",
// 	container: true,
// 	children: [{
// 			name: "My first folder",
// 			id: "124",
// 			container: true,
// 			children: []
// 		},{
// 			name: "I opened this folder",
// 			id: "125",
// 			container: true,
// 			children: [{
// 				name: "A sub-folder",
// 				id: "126",
// 				container: true,
// 				children: [{
// 					name: "How about another sub-folder with a really loooooooong name?",
// 					id: "128",
// 					container: true,
// 					children: []
// 				}, {
// 					name: "This is an item",
// 					id: "129",
// 					container: false,
// 					children: null
// 				}]
// 			}]
// 		}, {
// 			name: "How about this folder?",
// 			id: "127",
// 			container: true,
// 			children: null
// 		}]
// };

var makebigid = function() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	for(var i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

var words = ["Agent", "Realtime", "Historical", "Call Type", "CCE", "Ready", "Detail", "Precision", "Queue"];

var generated = {
	name: "Reports",
	id: "CCCCCCCC11111111AAAAAAAA00000003",
	permissions: "EXEC",
	container: true,
	children: [{
		name: "Stock",
		id: "CCCCCCCC11111111AAAAAAAA00000005",
		permissions: "EXEC",
		container: true,
		children: []
	}]
};

var getName = function() {
	var name = "";
	for(var i = 0; i < 3; i++) {
		name += (words[Math.floor(Math.random() * words.length)] + " ");
	}
	name.trim();
	return name;
}

var generate = function(num) {
	for(var i = 0; i < num; i++) {
		generated.children[0].children.push({
			name: getName(),
			id: makebigid(),
			permissions: "EXEC_WRITE",
			container: true,
			children: []
		});
	}
}

generate(1000);

var root = {
   "name":"Reports",
   "id":"CCCCCCCC11111111AAAAAAAA00000003",
   "permissions":"EXEC_WRITE",
   "container":true,
   "children":[
      {
         "name":"Stock",
         "id":"CCCCCCCC11111111AAAAAAAA00000005",
         "permissions":"EXEC_WRITE",
         "container":true,
         "children":[
            {
               "name":"CCE",
               "id":"D235B84510000143000000150A4E5A8E",
               "permissions":"EXEC_WRITE",
               "container":true,
               "children":[
                  {
                     "name":"CCE_AF_Historical",
                     "id":"D235B8D510000143000000160A4E5A8E",
                     "permissions":"EXEC_WRITE",
                     "container":true,
                     "children":[
                        {
                           "name":"Agent Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000001",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Not Ready Detail",
                           "id":"CCCCCCCC00000000CCCCCCCC00000002",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Precision Queue Historical All Fields",
                           "id":"B183B9A41000012F4A0031483F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Queue Interval",
                           "id":"2FF060AB10000138493B9C0A0A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Skill Group Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000004",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Team Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000007",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Abandon-Answer Distribution Historical",
                           "id":"CCCCCCCC00000000CCCCCCCC00000010",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000011",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Queue Interval All Fields",
                           "id":"DFAEC0F41000012F3A2ECC283F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Skill Group Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000013",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Enterprise Service Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000014",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Enterprise Skill Group Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000015",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"IVR Ports Performance Historical",
                           "id":"CCCCCCCC00000000CCCCCCCC00000017",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Peripheral Service Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000018",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Peripheral Skill Group Historical All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000020",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Abandon Answer Distribution Historical",
                           "id":"E1811AB51000013710826B690A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Efficiency",
                           "id":"3B2D347A100001362E3DD7C40A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Efficiency Drill Down",
                           "id":"CB26399210000136065A49CF0A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Interval All Fields",
                           "id":"DAEE01381000012F3BAF08693F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Skill Group Abandon-Answer Distribution Historical",
                           "id":"F85A196D1000013207A221330A4D41E1",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        }
                     ]
                  },
                  {
                     "name":"CCE_AF_Realtime",
                     "id":"D2387B7A10000143000000E30A4E5A8E",
                     "permissions":"EXEC_WRITE",
                     "container":true,
                     "children":[
                        {
                           "name":"Agent Precision Queue Membership",
                           "id":"6891A67A1000012F0E86370B3F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Queue Real Time",
                           "id":"E6BD1317100001371903A9C40A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Real Time",
                           "id":"428B34DE1000012F1ACF4E563F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Skill Group Real Time",
                           "id":"CCCCCCCC00000000CCCCCCCC00000005",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent State Real Time Graph",
                           "id":"CCCCCCCC00000000CCCCCCCC00000006",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Team Real Time",
                           "id":"453C713F1000012F5A0DC7E63F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Team State Counts Real Time",
                           "id":"CCCCCCCC00000000CCCCCCCC00000009",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Real Time",
                           "id":"CCCCCCCC00000000CCCCCCCC00000012",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Enterprise Skill Group Real Time",
                           "id":"CCCCCCCC00000000CCCCCCCC00000016",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Peripheral Service Real Time All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000019",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Peripheral Skill Group Real Time All Fields",
                           "id":"CCCCCCCC00000000CCCCCCCC00000021",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Real Time All Fields",
                           "id":"479C77E01000012F34837F4F3F57E6DF",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Precision Queue Step Real Time",
                           "id":"3605F9341000013672B57E420A00060D",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"System Capacity Real Time",
                           "id":"596F34E4100001360C400CF10A4D41E2",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        }
                     ]
                  },
                  {
                     "name":"CCE_TR_Historical",
                     "id":"D2371534100001430000006F0A4E5A8E",
                     "permissions":"EXEC_WRITE",
                     "container":true,
                     "children":[
                        {
                           "name":"Agent Attendance",
                           "id":"D237153A10000143000000700A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Agent Attendance Historical Report",
                                 "id":"A6ECE835100001323EA972A63F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Attendance Monthly Historical",
                                 "id":"1C539F36100001330B9DD90C3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Attendance Weekly Historical",
                                 "id":"1C4E6D5F1000013343B900603F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Skill",
                           "id":"D23785A810000143000000BD0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Agent Skill Historical Report",
                                 "id":"694193D41000013338A31A253F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Skill Monthly Historical",
                                 "id":"68C45C321000013313E2B6283F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Skill Weekly Historical",
                                 "id":"69E1273A1000013215F019443F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Summary",
                           "id":"D2373983100001430000008A0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Agent Summary Historical Report",
                                 "id":"A85BABFB100001327DB3CFE23F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Summary Monthly Historical",
                                 "id":"1C47E17F100001334908FF1D3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Summary Weekly Historical",
                                 "id":"1C38B0301000013331B974033F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Team",
                           "id":"D23771CB10000143000000B20A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Agent Team  Weekly Historical",
                                 "id":"60134C191000013262356DD73F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Team Historical Report",
                                 "id":"A82EC9101000013274F2F7283F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Team Monthly Historical",
                                 "id":"6494DD53100001327E97CB8B3F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Team Attendance",
                           "id":"D2375054100001430000009C0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Agent Team Attendance Historical",
                                 "id":"589822FC1000013341C5DE033F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Team Attendance Monthly Historical",
                                 "id":"5DC2C4A8100001331B3892A33F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Agent Team Attendance Weekly Historical",
                                 "id":"5A02E7F6100001336AAA73DE3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Call Type Skill Group",
                           "id":"D23745E210000143000000910A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Call Type Skill Group Historical Report",
                                 "id":"69EA32BB10000133607244953F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Call Type Skill Group Monthly Historical",
                                 "id":"F0E38A64100001320FC629553F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Call Type Skill Group Weekly Historical",
                                 "id":"F0CC265A1000013239CB3A2C3F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Skill",
                           "id":"D2372474100001430000007C0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Skill Daily Historical",
                                 "id":"6EF16D50100001322A89B93C3F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Interval Historical",
                                 "id":"B75742C510000132049BB5883F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Monthly Historical",
                                 "id":"7EB39229100001325AD8DF2D3F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Weekly Historical",
                                 "id":"7E7A937D100001324AF575153F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Skill Call Profile",
                           "id":"D237648510000143000000A70A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Skill Call Profile Historical Report",
                                 "id":"961EF887100001323A6B70193F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Call Profile Monthly Historical",
                                 "id":"F341D4CA100001331B8E9BDD3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Call Profile Weekly Historical",
                                 "id":"F3241BC1100001333386BB7E3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Skill Summary",
                           "id":"D237986310000143000000C80A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Skill Summary Historical Report",
                                 "id":"ED7515B6100001320D467AB33F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Summary Monthly Historical",
                                 "id":"EDB0263710000132566E91773F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Summary Weekly Historical",
                                 "id":"BA15116D100001322EF74F633F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Login Logout Historical",
                           "id":"64ED8F2C1000013218E5E2C73F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Not Ready Historical",
                           "id":"59F1603B10000132409B9A523F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent State Trace Historical",
                           "id":"9F052CB61000013369BEA1553F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Team Not Ready Historical",
                           "id":"5F1EF201100001325DC68DD53F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        }
                     ]
                  },
                  {
                     "name":"CCE_TR_Realtime",
                     "id":"D239EE8F10000143000001280A4E5A8E",
                     "permissions":"EXEC_WRITE",
                     "container":true,
                     "children":[
                        {
                           "name":"Skill Group Status",
                           "id":"D239FF47100001430000013B0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Skill Group Agent Status Real Time",
                                 "id":"35AAA0BA1000013310C195713F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Group Real Time Status",
                                 "id":"371B9119100001327178EC763F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Group Status Graphical Real Time",
                                 "id":"36F4FE1C100001327D5C49BD3F57F5A3",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Skill Status",
                           "id":"D23A04A2100001430000014C0A4E5A8E",
                           "permissions":"EXEC_WRITE",
                           "container":true,
                           "children":[
                              {
                                 "name":"Skill Status Agent Real Time",
                                 "id":"58661E841000013326BAF0D63F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              },
                              {
                                 "name":"Skill Status Real Time",
                                 "id":"44F30298100001334688E52B3F57F543",
                                 "permissions":"EXEC_WRITE",
                                 "container":false
                              }
                           ]
                        },
                        {
                           "name":"Agent Real Time",
                           "id":"F2F25D791000013217088CEC3F57F543",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Agent Team Real Time",
                           "id":"ABAD02BF100001311970CDA93F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Call Type Real Time",
                           "id":"17D800351000013240D18A873F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Skill Group Not Ready Detail Real Time",
                           "id":"3B97AB74100001326861A1C43F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        },
                        {
                           "name":"Skill Group Not Ready Real Time",
                           "id":"D9222D32100001315F04D2363F57F5A3",
                           "permissions":"EXEC_WRITE",
                           "container":false
                        }
                     ]
                  }
               ]
            },
            {
               "name":"Intelligence Center Admin",
               "id":"CCCCCCCC11111111AAAAAAAE00000007",
               "permissions":"EXEC_WRITE",
               "container":true,
               "children":[
                  {
                     "name":"Audit Trail",
                     "id":"81D1F50E10000132146C556B0A4E5BC4",
                     "permissions":"EXEC",
                     "container":false
                  }
               ]
            }
         ]
      },
      {
         "name":"Test-D-Filter",
         "id":"EE3CB9D310000146000000200A4E5A8E",
         "permissions":"EXEC_WRITE",
         "container":false
      },
      {
         "name":"test_audit",
         "id":"1FB0B5CA10000147000000020A4E5A8E",
         "permissions":"EXEC_WRITE",
         "container":false
      }
   ]
};
