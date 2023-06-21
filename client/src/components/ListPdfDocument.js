import React from "react";
import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const ListPdfDocument = (props) => {

    console.log("PDF props", props.data);

    return(
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                {
                    props.data.getSignupsForMenuItem && props.data.getSignupsForMenuItem.map(
                        entry => {
                            return (
                                <View style={styles.section}>
                                    <Text>{entry.user.fullName}</Text>
                                    <Text>{entry.size}</Text>
                                </View>
                            )
                        }
                    )
                }
                </Page>
            </Document>
        </>
    );
}

export default ListPdfDocument;