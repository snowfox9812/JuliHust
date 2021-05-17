import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import { materialTheme, products, Images } from "../constants/";
import { Select, Icon, Header, Product, Switch } from "../components/";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderHeight } from "../constants/utils";
import { DataTable } from "react-native-paper";

// const { width } = Dimensions.get("screen");
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default class Components extends React.Component {
  state = {
    "switch-1": true,
    "switch-2": false,
  };

  toggleSwitch = (switchId) =>
    this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    return (
      <Block flex>
        <Text bold size={16} style={styles.title}>
          Buttons
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button
              shadowless
              color={materialTheme.COLORS.DEFAULT}
              style={[styles.button, styles.shadow]}
            >
              DEFAULT
            </Button>
          </Block>
          <Block center>
            <Button shadowless style={[styles.button, styles.shadow]}>
              PRIMARY
            </Button>
          </Block>
          <Block center>
            <Button
              shadowless
              color="info"
              style={[styles.button, styles.shadow]}
            >
              INFO
            </Button>
          </Block>
          <Block center>
            <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
            >
              SUCCESS
            </Button>
          </Block>
          <Block center>
            <Button
              shadowless
              color="warning"
              style={[styles.button, styles.shadow]}
            >
              WARNING
            </Button>
          </Block>
          <Block center>
            <Button
              shadowless
              color="danger"
              style={[styles.button, styles.shadow]}
            >
              ERROR
            </Button>
          </Block>
          <Block row space="evenly">
            <Block flex left style={{ marginTop: 8 }}>
              <Select
                defaultIndex={1}
                options={[1, 2, 3, 4, 5]}
                style={styles.shadow}
              />
            </Block>
            <Block flex center>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}
              >
                DELETE
              </Button>
            </Block>
            <Block flex={1.25} right>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}
              >
                SAVE FOR LATER
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Typography
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text h1 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Heading 1
          </Text>
          <Text h2 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Heading 2
          </Text>
          <Text h3 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Heading 3
          </Text>
          <Text h4 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Heading 4
          </Text>
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Heading 5
          </Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>
            Paragraph
          </Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
      </Block>
    );
  };

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Inputs
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            right
            placeholder="icon right"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
            iconContent={
              <Icon
                size={16}
                color={theme.COLORS.ICON}
                name="camera-18"
                family="GalioExtra"
              />
            }
          />
        </Block>
      </Block>
    );
  };

  renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Switches
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block
            row
            middle
            space="between"
            style={{ marginBottom: theme.SIZES.BASE }}
          >
            <Text size={14}>Switch is ON</Text>
            <Switch
              value={this.state["switch-1"]}
              onValueChange={() => this.toggleSwitch("switch-1")}
            />
          </Block>
          <Block row middle space="between">
            <Text size={14}>Switch is OFF</Text>
            <Switch
              value={this.state["switch-2"]}
              onValueChange={() => this.toggleSwitch("switch-2")}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  renderTableCell = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Table Cell
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigation.navigate("Pro")}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>Manage Options</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  renderNavigation = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Navigation
        </Text>
        <Block>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header back title="Title" navigation={this.props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header search title="Title" navigation={this.props.navigation} />
          </Block>

          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Header
              tabs
              search
              title="Title"
              tabTitleLeft="Option 1"
              tabTitleRight="Option 2"
              navigation={this.props.navigation}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Social
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row center space="between">
            <Block flex middle right>
              <Button
                round
                onlyIcon
                shadowless
                icon="facebook"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle center>
              <Button
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.TWITTER}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle left>
              <Button
                round
                onlyIcon
                shadowless
                icon="dribbble"
                iconFamily="font-awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.DRIBBBLE}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Cards
        </Text>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Product product={products[0]} horizontal />
            <Block flex row>
              <Product
                product={products[1]}
                style={{ marginRight: theme.SIZES.BASE }}
              />
              <Product product={products[2]} />
            </Block>
            <Product product={products[3]} horizontal />
            <Product product={products[4]} full />
            <Block flex card shadow style={styles.category}>
              <ImageBackground
                source={{ uri: Images.Products["Accessories"] }}
                style={[
                  styles.imageBlock,
                  { width: width - theme.SIZES.BASE * 2, height: 252 },
                ]}
                imageStyle={{
                  width: width - theme.SIZES.BASE * 2,
                  height: 252,
                }}
              >
                <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>
                    Accessories
                  </Text>
                </Block>
              </ImageBackground>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block
        flex
        style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
      >
        <Text bold size={16} style={styles.title}>
          Album
        </Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate("Home")}
            >
              View All
            </Text>
          </Block>
          <Block
            row
            space="between"
            style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
          >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      // <Block flex center>
      //   <ScrollView
      //     style={styles.components}
      //     showsVerticalScrollIndicator={false}>
      //       {this.renderButtons()}
      //       {this.renderText()}
      //       {this.renderInputs()}
      //       {this.renderSwitches()}
      //       {this.renderTableCell()}
      //       {this.renderNavigation()}
      //       {this.renderSocial()}
      //       {this.renderCards()}
      //       {this.renderAlbum()}
      //   </ScrollView>
      //   </Block>
      <Block flex style={styles.profile}>
        {/* <Block flex>
          <ImageBackground
            source={{ uri: Images.Profile }}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}
          >
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                  trung nguyễn
                </Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">
                        Pro
                      </Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>
                      Beginner
                    </Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      4.8{" "}
                      <Icon name="shape-star" family="GalioExtra" size={14} />
                    </Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon
                        name="map-marker"
                        family="font-awesome"
                        color={theme.COLORS.MUTED}
                        size={16}
                      />
                      {` `} Hust, Hanoi
                    </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                style={styles.gradient}
              />
            </Block>
          </ImageBackground>
        </Block> */}
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row flex style={{ padding: theme.SIZES.BASE }}>
              <Block flex={1} middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  23
                </Text>
                <Text muted size={12}>
                  Lesson learned
                </Text>
              </Block>
              {/* <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  5
                </Text>
                <Text muted size={12}>
                  Bids & Offers
                </Text>
              </Block> */}
              <Block flex={1} middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  80%
                </Text>
                <Text muted size={12}>
                  Good result
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: "baseline" }}
            >
              <Text size={16}>Recently learned</Text>
              {/* <Text
                size={12}
                color={theme.COLORS.PRIMARY}
                onPress={() => this.props.navigation.navigate("Home")}
              >
                View All
              </Text> */}
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              {/* <Block row space="between" style={{ flexWrap: "wrap" }}>
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={{ uri: img }}
                    key={`viewed-${img}`}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block> */}
              {/* <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Lesson</DataTable.Title>
                  <DataTable.Title numeric>Sentence</DataTable.Title>
                  <DataTable.Title numeric>Accuracy</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>1</DataTable.Cell>
                  <DataTable.Cell numeric>1.1</DataTable.Cell>
                  <DataTable.Cell numeric>60%</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>1</DataTable.Cell>
                  <DataTable.Cell numeric>1.2</DataTable.Cell>
                  <DataTable.Cell numeric>80%</DataTable.Cell>
                </DataTable.Row>
                
                <DataTable.Row>
                  <DataTable.Cell>1</DataTable.Cell>
                  <DataTable.Cell numeric>1.3</DataTable.Cell>
                  <DataTable.Cell numeric>100%</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                  page={1}
                  numberOfPages={3}
                  onPageChange={(page) => {
                    console.log(page);
                  }}
                  label="1-2 of 6"
                />
              </DataTable> */}
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {
    width: width,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4A4A4A",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 2,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
});
