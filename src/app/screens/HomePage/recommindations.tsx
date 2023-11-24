import { Box, Stack } from "@mui/joy";
import { Avatar, Container } from "@mui/material";
import React from "react";

export function Recommindations() {
  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className={"category_title"}>Tavfsiya qilingan maqolalar</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack>
              <Stack className={"article_container"}>
                <Box className={"article_category"}>Ko'p ko'rilgan</Box>

                <Stack className={"article_box"}>
                  <Box
                    className={"article_img"}
                    sx={{
                      backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAarWmvROIDc0DRTQIdpOTRkawg3F2AM2IA&usqp=CAU)`,
                    }}
                  ></Box>
                  <Box className={"article_info"}>
                    <Box className={"article_main_info"}>
                      <div className={"article_author"}>
                        <Avatar
                          src={"auth/df_user.jpeg"}
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <span className={"author_username"}>Jonibek</span>
                      </div>
                      <span className={"article_title"}>
                        Eng qiziqarli va shirin taomlar
                      </span>
                      <p className={"article_desc"}></p>
                    </Box>
                  </Box>
                </Stack>
                <Stack className={"article_box"}>
                  <Box
                    className={"article_img"}
                    sx={{
                      backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAarWmvROIDc0DRTQIdpOTRkawg3F2AM2IA&usqp=CAU)`,
                    }}
                  ></Box>
                  <Box className={"article_info"}>
                    <Box className={"article_main_info"}>
                      <div className={"article_author"}>
                        <Avatar
                          src={"auth/df_user.jpeg"}
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <span className={"author_username"}>Jonibek</span>
                      </div>
                      <span className={"article_title"}>
                        Eng qiziqarli va shirin taomlar
                      </span>
                      <p className={"article_desc"}></p>
                    </Box>
                  </Box>
                </Stack>
              </Stack>

              <Stack className={"article_container"} paddingTop={"20px"}>
                <Box className={"article_category"}>Ko'p yoqtirganlar</Box>

                <Stack className={"article_box"}>
                  <Box
                    className={"article_img"}
                    sx={{
                      backgroundImage: `url(https://www.sidechef.com/ingredient/7cae3481-86d3-434d-a784-ceaf8ddfce62.jpg)`,
                    }}
                  ></Box>
                  <Box className={"article_info"}>
                    <Box className={"article_main_info"}>
                      <div className={"article_author"}>
                        <Avatar
                          src={"auth/df_lucas.jpeg"}
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <span className={"author_username"}>lucas</span>
                      </div>
                      <span className={"article_title"}>
                        khorezmning ajoyib ovqatlari
                      </span>
                      <p className={"article_desc"}></p>
                    </Box>
                  </Box>
                </Stack>
                <Stack className={"article_box"}>
                  <Box
                    className={"article_img"}
                    sx={{
                      backgroundImage: `url(https://www.sidechef.com/ingredient/7cae3481-86d3-434d-a784-ceaf8ddfce62.jpg)`,
                    }}
                  ></Box>
                  <Box className={"article_info"}>
                    <Box className={"article_main_info"}>
                      <div className={"article_author"}>
                        <Avatar
                          src={"auth/df_lucas.jpeg"}
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <span className={"author_username"}>lucas</span>
                      </div>
                      <span className={"article_title"}>
                        khorezmning ajoyib ovqatlari
                      </span>
                      <p className={"article_desc"}></p>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"} paddingBottom={"15px"}>
                Mashhurlar
              </Box>
              <Box className={"article_news"}>
                {" "}
                <h1 style={{ color: "orange" }}>TViewer</h1>{" "}
              </Box>
              <Box className={"article_news"}>
                {" "}
                <h1 style={{ color: "orange" }}>TViewer</h1>{" "}
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
