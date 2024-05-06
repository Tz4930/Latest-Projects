import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { Popconfirm } from "antd";
import "antd/dist/antd.css";
import { grey } from "@mui/material/colors";
import style from "../components/style.module.css";
import Image from "react-bootstrap/Image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import apiConstant from "../../../../constant/appConstant";

function MenuTable(props) {
  const {
    menuModalOpen,
    menuState,
    deleteCategory,
    handleMenuItemUpdateState,
    handleCategoriesUpdateState,
    handleSortCategories,
    handleSortmenuItem,
    deleteMenuItems,
    // handleDelete,
    // onChangePage,
    // onChangeRowsPerPage,
    // state,
  } = props;
  return (
    <>
      <>
        {menuState &&
          menuState.categoriesList &&
          menuState.categoriesList.map((item, Categoryindex) => (
            <>
              <div className={style.categoriesListBox}>
                <div className={style.mainRoot} key={Categoryindex}>
                  <div className={style.categoriesTitle}>{item.name}</div>
                  <div className={style.categoriesActionsIcons}>
                    {Categoryindex !== 0 ? (
                      <ArrowUpwardIcon
                        onClick={() => handleSortCategories(item, "increment")}
                        sx={{ color: grey[500] }}
                      />
                    ) : (
                      ""
                    )}
                    {menuState &&
                    menuState.categoriesList &&
                    Categoryindex !== menuState.categoriesList.length - 1 ? (
                      <ArrowDownwardIcon
                        onClick={() => handleSortCategories(item, "decrement")}
                        sx={{ color: grey[500] }}
                      />
                    ) : (
                      ""
                    )}
                    <EditIcon
                      sx={{ color: grey[500] }}
                      onClick={() => handleCategoriesUpdateState(item)}
                    />
                    <Popconfirm
                      key="popConfirm"
                      title="Are you sure you want to delete?"
                      onConfirm={() => deleteCategory(item)}
                    >
                      <DeleteForeverIcon sx={{ color: grey[500] }} />
                    </Popconfirm>
                  </div>
                </div>
                {item.menuitems &&
                  item.menuitems.map((menuItem, menuItemIndex) => (
                    <>
                      <div className={style.mainRoot} key={menuItemIndex}>
                        <div className={style.menuItemImage}>
                          {
                            menuItem.image && menuItem.image.indexOf('http') === -1 &&
                            <Image
                            src={
                              menuItem.image !== "N/A"
                                ? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/` +
                                  menuItem.image
                                : "/img/1.jpg"
                            }
                            width="100"
                            height="50"
                            fluid
                          />
                        }
                        {
                            menuItem.image && menuItem.image.indexOf('http') !== -1 &&
                            <Image
                            src={
                              menuItem.image !== "N/A"
                                ? menuItem.image
                                : "/img/1.jpg"
                            }
                            width="100"
                            height="50"
                            fluid
                          />
                        }
                        </div>

                        <div className={style.menuItemTitle}>
                          <div>{menuItem.name}</div>
                          <div>{menuItem.description}</div>
                        </div>
                        <div className={style.menuItemPrice}>
                          {menuItem.price}
                        </div>
                      </div>
                      <div className={style.menuItemActions}>
                        {menuItemIndex !== 0 ? (
                          <ArrowUpwardIcon
                            onClick={() =>
                              handleSortmenuItem(menuItem, "menuItemIncrement")
                            }
                            sx={{ color: grey[500] }}
                          />
                        ) : (
                          ""
                        )}
                        {item &&
                        item.menuitems &&
                        menuItemIndex !== item.menuitems.length - 1 ? (
                          <ArrowDownwardIcon
                            onClick={() =>
                              handleSortmenuItem(menuItem, "menuItemDecrement")
                            }
                            sx={{ color: grey[500] }}
                          />
                        ) : (
                          ""
                        )}

                        <EditIcon
                          sx={{ color: grey[500] }}
                          onClick={() =>
                            handleMenuItemUpdateState(menuItem, item)
                          }
                        />
                        <Popconfirm
                          key="popConfirm"
                          title="Are you sure you want to delete?"
                          onConfirm={() => deleteMenuItems(menuItem)}
                        >
                          <DeleteForeverIcon sx={{ color: grey[500] }} />
                        </Popconfirm>
                      </div>
                    </>
                  ))}

                <div className={style.menuItemButton}>
                  <Button
                    onClick={() => menuModalOpen(item, "addMenuItem")}
                    size="medium"
                    className={style.menuItemButtonBody}
                    variant="success"
                  >
                    Add Menu Item
                  </Button>
                </div>
              </div>
            </>
          ))}
      </>
    </>
  );
}

export default withRouter(MenuTable);
